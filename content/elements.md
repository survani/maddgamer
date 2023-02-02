---
title: "Elements"
description: "this is meta description"
---

### Elements

This page demonstrate some basic elements and typography which you will use frequently within your site. Make the text **bold** or make it *italic*. Why not **_bold and italic_** both at a time. Here is the link to [Next.js](https://nextjs.org/) website. Do you want to link a long text [here how it looks in this theme](https://nextjs.org/).

URLs and URLs in angle brackets will automatically get turned into links. https://nextjs.org/ or <https://nextjs.org/> and sometimes www.example.com (but not on Github, for example).

# Heading one
## Heading two
### Heading three
#### Heading four
##### Heading five
###### Heading six

#### Paragraph

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.

It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

<hr/>

#### Ordered List

1. The leap into electronic typesetting
2. It was popularised in the 1960s
3. Recently with desktop publishing software
4. An unknown printer took a galley
5. It has survived not only five centuries

<hr/>

#### Unordered List

* The leap into electronic typesetting
* It was popularised in the 1960s
* Recently with desktop publishing software
* An unknown printer took a galley
* It has survived not only five centuries

<hr/>

#### Image

<img src="../images/gallery/10.jpg" class="img-left" alt="image-example" width="325">

Ratione unde maiores uisquam fugit voluptates, voluptatum consequatur harum enim quidem sapiente facilis recusandae a expedita odit. Iusto facere molestiae veritatis doloremque dignissimos quos aliquam placeat non perspiciatis doloribus iste vel, omnis deserunt nam quod nisi magnam! Optio, incidunt omnis reiciendis eius error esse autem, voluptatibus commodi eligendi odit nemo nesciunt fugit fugiat id harum explicabo dignissimos illo nobis ducimus voluptatum tempora ad. Atque tempora autem eius quo dolorem, minus maxime natus deleniti facilis aut enim impedit ut consectetur nobis hic labore laudantium veniam! Veniam vitae excepturi quis, officiis earum adipisci iste. voluptatibus commodi eligendi odit nemo nesciunt fugit fugiat id harum explicabo dignissimos illo nobis ducimus voluptatum tempora ad. Atque tempora autem eius quo dolorem, minus maxime natus deleniti facilis aut enim impedit ut consectetur nobis hic labore laudantium veniam! Veniam vitae excepturi quis.

<img src="../images/gallery/15.jpg" class="img-right" alt="image-example" width="320">

omnis deserunt nam quod nisi magnam! Optio, incidunt omnis reiciendis eius error esse autem, voluptatibus commodi eligendi odit nemo nesciunt fugit fugiat id harum explicabo dignissimos illo nobis ducimus voluptatum tempora ad. Atque tempora autem eius quo dolorem, minus maxime natus deleniti facilis aut enim impedit ut consectetur nobis hic labore laudantium veniam! Veniam vitae excepturi quis, officiis earum adipisci iste. voluptatibus commodi eligendi odit nemo nesciunt fugit

<hr/>

#### Blockquote

> Since its beginning in the 1950s, the field of artificial intelligence has cycled several times between periods of optimistic predictions and investment
<cite>Nolen Kristopher</cite>

<hr/>

#### Code and Syntax Highlighting

Inline `code` has `back-ticks` around it.

##### Script
```javascript
export const getStaticProps = async ({ params: { tagname } }) => {
  const allPost = getPosts();
  const filteredPostByTag = allPost.filter((post) =>
    post.frontMatter.tags.map((tag) => slugify(tag)).includes(tagname)
  );

  return {
    props: {
      authors: getAuthors(),
      posts: filteredPostByTag,
      tag: tagname,
    },
  };
}
```

##### SCSS
```scss
.form-control {
  padding: 0;
  border: 0;
  border-radius: 0;
  border: 1px solid #ddd;
  transition: 0.3s ease;
  padding: 12px 16px;
  &:not(textarea) {
    height: 50px;
  }
  &:focus {
    box-shadow: none;
    color: $dark;
    border-color: rgba($dark, 0.5);
    ~ .input-group-append {
      .input-group-text {
        border-color: rgba($dark, 0.5);
      }
    }
  }
}
```

<hr/>

#### Blockquote

> Since its beginning in the 1950s, the field of artificial intelligence has cycled several times between periods of optimistic predictions and investment
<cite>Alexender Toto</cite>

<hr/>

#### Responsive Markdown table

Colons can be used to align columns.
<div class="table-responsive">

| Firsname | Lastname | Age | Lives in | Profession |
| -------- | -------- | --- | -------- | ---------- |
| Jill     | Smith    | 29  | New york | Developer  |
| Eve      | Jackson  | 36  | New york | Musician   |

</div>
<hr/>

### Responsive HTML table

<div class="table-responsive">
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Heading</th>
        <th scope="col">Heading</th>
        <th scope="col">Heading</th>
        <th scope="col">Heading</th>
        <th scope="col">Heading</th>
        <th scope="col">Heading</th>
        <th scope="col">Heading</th>
        <th scope="col">Heading</th>
        <th scope="col">Heading</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Cell</td>
        <td>Cell</td>
        <td>Cell</td>
        <td>Cell</td>
        <td>Cell</td>
        <td>Cell</td>
        <td>Cell</td>
        <td>Cell</td>
        <td>Cell</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Cell</td>
        <td>Cell</td>
        <td>Cell</td>
        <td>Cell</td>
        <td>Cell</td>
        <td>Cell</td>
        <td>Cell</td>
        <td>Cell</td>
        <td>Cell</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Cell</td>
        <td>Cell</td>
        <td>Cell</td>
        <td>Cell</td>
        <td>Cell</td>
        <td>Cell</td>
        <td>Cell</td>
        <td>Cell</td>
        <td>Cell</td>
      </tr>
    </tbody>
  </table>
</div>

<hr/>


### Image

<figure>
  <img src="../images/blog/02.jpg" alt="image-example">
  <figcaption>This is example photo caption</figcaption>
</figure>

<hr/>

### Gallery
<div class="gallery">
  <img src="../images/gallery/10.jpg" alt="image-example">
  <img src="../images/gallery/11.jpg" alt="image-example">
  <img src="../images/gallery/12.jpg" alt="image-example">
  <img src="../images/gallery/13.jpg" alt="image-example">
  <img src="../images/gallery/14.jpg" alt="image-example">
  <img src="../images/gallery/15.jpg" alt="image-example">
</div>

<hr/>

### Youtube video
<div class="ratio ratio-16x9">
<iframe src="https://www.youtube.com/embed/NC0WPQd_bds"></iframe>
</div>

<hr/>

### Vimeo video
<div class="ratio ratio-16x9">
<iframe src="https://player.vimeo.com/video/341490793"></iframe>
</div>