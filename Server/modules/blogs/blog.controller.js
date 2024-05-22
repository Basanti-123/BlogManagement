const { generateSlug } = require("../../utils/slugify");
const blogModel = require("./blog.model");
//const { search } = require("./blog.route");

// create
const create = (payload) => {
  payload.slug = generateSlug(payload.title);
  return blogModel.create(payload);
};

// read
const list = async (search, page = 1, limit = 10) => {
  // search pagination
  const query = [];

  // lookup
  query.push(
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "authorInfo",
      },
    },
    {
      $unwind: {
        path: "$authorInfo",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $project: {
        title: 1,
        slug: 1,
        content: 1,
        tags: 1,
        words: 1,
        status: 1,
        authorId: "$author",
        author: "$authorInfo.name",
        createdAt: 1,
      },
    }
  );

  query.push({
    $sort: {
      createdAt: -1,
    },
  });

  // search

  if (search?.authorId) {
    query.push({
      $match: {
        authorId: search?.authorId,
      },
    });
  }

  if (search?.author) {
    query.push({
      $match: {
        author: new RegExp(search?.author, "gi"),
      },
    });
  }

  if (search?.title) {
    query.push({
      $match: {
        title: new RegExp(search.title, "gi"),
      },
    });
  }

  // pagination
  query.push(
    {
      $facet: {
        metadata: [
          {
            $count: "total",
          },
        ],
        data: [
          {
            $skip: (+page - 1) * +limit,
          },
          {
            $limit: +limit,
          },
        ],
      },
    },
    {
      $addFields: {
        total: {
          $arrayElemAt: ["$metadata.total", 0],
        },
      },
    },
    {
      $project: {
        metadata: 0,
      },
    }
  );

  const result = await blogModel.aggregate(query);
  return {
    data: result[0].data,
    total: result[0].total || 0,
    page: +page,
    limit: +limit,
  };
};

const getPublishedBlogOnly = async (search, page = 1, limit = 10) => {
  const query = [];
  // unwind the author name from objectId

  query.push(
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: {
        path: "$author",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $project: {
        author: "$author.name",
        title: 1,
        tags: 1,
        slug: 1,
        status: 1,
        content: 1,
        words: 1,
        image: 1,
        createdAt: 1,
      },
    }
  );

  // if author name is passed, search that user blogs
  if (search?.author) {
    query.push({
      $match: {
        author: new RegExp(search?.author, "gi"),
      },
    });
  }

  if (search?.title) {
    query.push({
      $match: {
        title: new RegExp(search?.title, "gi"),
      },
    });
  }

  // if (search?.sort) {
  //   query.push({
  //     $sort: {
  //       createdAt:search?.sort ==='newest'? -1:1,
  //     },
  //   });
  // }

  // ensure blogs are published
  query.push({
    $match: {
      status: "published",
    },
  });

  // pagination
  query.push(
    {
      $facet: {
        metadata: [
          {
            $count: "total",
          },
        ],
        data: [
          {
            $skip: (+page - 1) * +limit,
          },
          {
            $limit: +limit,
          },
        ],
      },
    },
    {
      $addFields: {
        total: {
          $arrayElemAt: ["$metadata.total", 0],
        },
      },
    },
    {
      $project: {
        metadata: 0,
      },
    }
  );
  const result = await blogModel.aggregate(query);
  return {
    data: result[0].data,
    total: result[0].total || 0,
    page: +page,
    limit: +limit,
  };
};

// read
const getById = (_id) => {
  return blogModel.findOne({ _id });
};

const getBySlug = (slug) => {
  return blogModel.findOne({ slug }).populate("author", "name");
};
// updted
// const upteById = (_id, payload) => {
//   delete payload.slug;
//   if (payload.title) payload.slug = generateSlug(payload.title);
//   if (payload.content) payload.words = payload.content.split(" ").length;
//   return blogModel.updateOne({ _id }, payload, {new:true});
// };

const upteById = async (_id, payload) => {
  delete payload.slug;
  console.log("id", _id);
  if (payload.title) payload.slug = await generateSlug(payload.title);
  if (payload.content) payload.words = await payload.content.split(" ").length;
  const result = await blogModel.updateOne({ _id }, payload, { new: true });
  if (!result) throw new Error("cannot update the blog");
  return "blog updated successfully";
};

// delete
const deleteById = (_id) => {
  return blogModel.deleteOne({ _id });
};

const getAuthorBlogs = async (name, page = 1, limit = 10) => {
  const query = [];
  query.push(
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: {
        path: "$author",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $project: {
        author: "$author.name",
        title: 1,
        tags: 1,
        slug: 1,
        status: 1,
        content: 1,
        words: 1,
      },
    }
  );

  if (name) {
    query.push({
      $match: {
        author: new RegExp(name, "gi"),
      },
    });
  }

  query.push(
    {
      $facet: {
        metadata: [
          {
            $count: "total",
          },
        ],
        data: [
          {
            $skip: (+page - 1) * +limit,
          },
          {
            $limit: +limit,
          },
        ],
      },
    },
    {
      $addFields: {
        total: {
          $arrayElemAt: ["$metadata.total", 0],
        },
      },
    },
    {
      $project: {
        metadata: 0,
      },
    }
  );
  const result = await BlogModel.aggregate(query);
  return {
    data: result[0].data,
    total: result[0].total || 0,
    page: +page,
    limit: +limit,
  };
};

const updateStatus = async (_id) => {
  const blog = await blogModel.findOne({ _id });
  if (!blog) throw new Error("Blog not found");
  const payload = { ststus: blog?.status === "draft" ? "published" : "draft" };
  return blogModel.updateOne({ _id }, payload);
};

module.exports = {
  create,
  list,
  getById,
  upteById,
  deleteById,
  getPublishedBlogOnly,
  updateStatus,
  getAuthorBlogs,
  getBySlug,
};
