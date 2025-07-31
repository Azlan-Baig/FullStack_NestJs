import Hero from "@/components/Hero";
import PostCard from "@/components/postCard";
import Posts from "@/components/posts";
import { fetchPosts } from "@/lib/actions/postActions";

export default async function Home() {
  const posts = await fetchPosts()
  return (
    <main>
      <Hero/>
      <Posts posts={posts}/>
    </main>

  );
}
