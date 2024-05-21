import { DiscussionEmbed } from 'disqus-react';
export const Comment = ({url, id, title}) => {
  return (
<DiscussionEmbed
    shortname='example'
    config={
        {
            url,
            identifier: id,
            title: title,
            language: 'en_US' //e.g. for Traditional Chinese (Taiwan)	
        }
    }
/>
   
  )
}


