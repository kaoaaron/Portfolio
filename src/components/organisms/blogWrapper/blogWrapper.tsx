// components/Blog.js
import { BLOCKS } from "@contentful/rich-text-types";
import BlogImages from "@/components/molecules/blogImages";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BlogTitle, Container, RichTextContainer } from "./styles";
import MobileBlogTitle from "@/components/molecules/mobileBlogCard";
import CustomDivider from "@/components/atoms/customDivider";
import GroupedBlogCards from "../groupedBlogCards";

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!children || (Array.isArray(children) && children[0]?.length === 0)) {
    return <br />;
  }

  return (
    <p
      style={{
        whiteSpace: "pre-line",
        fontSize: "22px",
        lineHeight: "26px",
        letterSpacing: "0em",
      }}
    >
      {children}
    </p>
  );
};

const H1: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <h1
      style={{
        fontSize: "50px",
        marginBottom: "30px",
      }}
    >
      {children}
    </h1>
  );
};

const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <h2
      style={{
        fontSize: "30px",
      }}
    >
      {children}
    </h2>
  );
};

const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <h3
      style={{
        fontSize: "36px",
      }}
    >
      {children}
    </h3>
  );
};

const H4: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <p
      style={{
        fontSize: "20px",
      }}
    >
      {children}
    </p>
  );
};

const H5: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <p
      style={{
        fontSize: "18px",
      }}
    >
      {children}
    </p>
  );
};

const sectionRendererOptions = (links: any) => {
  if (!links) {
    return;
  }
  const entryMap = new Map();
  for (const entry of links.entries.block) {
    entryMap.set(entry.sys.id, entry);
  }

  return {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node: any, children: React.ReactNode) => (
        <P>{children}</P>
      ),
      [BLOCKS.HEADING_1]: (_node: any, children: React.ReactNode) => (
        <H1>{children}</H1>
      ),
      [BLOCKS.HR]: (_node: any, children: React.ReactNode) => (
        <CustomDivider startingHexColor="#972081" endingHexColor="#1F2269" />
      ),
      [BLOCKS.HEADING_2]: (_node: any, children: React.ReactNode) => (
        <H2>{children}</H2>
      ),
      [BLOCKS.HEADING_3]: (_node: any, children: React.ReactNode) => (
        <H3>{children}</H3>
      ),
      [BLOCKS.HEADING_4]: (_node: any, children: React.ReactNode) => (
        <H4>{children}</H4>
      ),
      [BLOCKS.HEADING_5]: (_node: any, children: React.ReactNode) => (
        <H5>{children}</H5>
      ),
      [BLOCKS.EMBEDDED_ENTRY]: (node: any, children: React.ReactNode) => {
        const entry = entryMap.get(node.data.target.sys.id);
        console.log("asdasd");
        if (entry.__typename === "BlogImages") {
          return (
            <BlogImages
              enableImageBorder={entry.enableImageBorder}
              images={entry.imagesCollection.items}
              imageCaption={entry.imageCaption}
              universalImageHeight={entry.universalImageHeight}
            />
          );
        }
      },
    },
  };
};

const BlogWrapper = ({ blogEntryData, allBlogData }: any) => {
  return (
    <Container>
      <MobileBlogTitle
        blogImage={blogEntryData.blogCoverImage?.url}
        title={blogEntryData.title}
      />

      <BlogTitle>{blogEntryData.title}</BlogTitle>

      <RichTextContainer>
        {documentToReactComponents(
          blogEntryData.blogDetails?.json,
          sectionRendererOptions(blogEntryData.blogDetails?.links)
        )}
      </RichTextContainer>
    </Container>
  );
};

export default BlogWrapper;
