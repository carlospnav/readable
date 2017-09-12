import React from 'react';

const PostsList = ({posts}) => {
  console.log(posts)
  return (
    <section> 
      {(posts) && (posts.map((post) => {
          return (
            <article>
              <h3>{post.title}</h3>
              <h6>{post.author}</h6>
              <p>{post.body}</p>
            </article>
          )
        }))
      }
    </section>
  )
}

export default PostsList;