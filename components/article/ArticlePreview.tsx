import Link from "next/link";
import React from "react";

import CustomLink from "components/common/CustomLink";
import CustomImage from "components/common/CustomImage";
import FavoriteArticleButton from "components/common/FavoriteArticleButton";
import { usePageDispatch } from "lib/context/PageContext";
import { formatDate } from "lib/utils/date";


const ArticlePreview = ({ article }) => {
  const setPage = usePageDispatch();
  const [preview, setPreview] = React.useState(article);
  const [hover, setHover] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(-1);
  if (!article) return;
  return (
    <div className="article-preview" style={{ padding: "1.5rem 0.5rem" }}>
      <div className="article-meta">
        <CustomLink
          href="/profile/[pid]"
          as={`/profile/${preview.author.username}`}
        >
          <CustomImage
            src={preview.author.image}
            alt="author's profile image"
          />
        </CustomLink>
        <div className="info">
          <CustomLink
            href="/profile/[pid]"
            as={`/profile/${preview.author.username}`}
            className="author"
          >
            <span onClick={() => setPage(0)}>{preview.author.username}</span>
          </CustomLink>
          <span className="date">
            {formatDate(preview.createdAt)}
          </span>
        </div>
        <div className="pull-xs-right">
          <FavoriteArticleButton
            favorited={preview.favorited}
            favoritesCount={preview.favoritesCount}
            slug={preview.slug} />
        </div>
      </div>
      <CustomLink
        href="/article/[pid]"
        as={`/article/${preview.slug}`}
        className="preview-link"
      >
        <h1>{preview.title}</h1>
        <p>{preview.description}</p>
        <span>Read more...</span>
        <ul className="tag-list" style={{ maxWidth: "100%" }}>
          {preview.tagList.map((tag, index) => {
            return (
              <Link href={`/?tag=${tag}`} as={`/?tag=${tag}`} key={index}>
                <li
                  className="tag-default tag-pill tag-outline"
                  onClick={(e) => e.stopPropagation()}
                  onMouseOver={() => {
                    setHover(true);
                    setCurrentIndex(index);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                    setCurrentIndex(-1);
                  }}
                  style={{
                    borderColor:
                      hover && currentIndex === index ? "#5cb85c" : "initial",
                  }}
                >
                  <span
                    style={{
                      color:
                        hover && currentIndex === index ? "#5cb85c" : "inherit",
                    }}
                    onClick={() => setPage(0)}
                  >
                    {tag}
                  </span>
                </li>
              </Link>
            );
          })}
        </ul>
      </CustomLink>
    </div>
  );
};

export default ArticlePreview;
