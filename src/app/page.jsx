import Feed from "@/components/Feed"


const Home=()=>{
  return(
    <section className="w-full flex-center flex-col px-[1rem] ">
      <h1 className="head_text text-center">Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient hidden:lg">AI-Powered Prompts</span>
      </h1>

      <p className="desc tect-center">
        Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts.
      </p>

      {/* Feed component */}
      <Feed/>
      
    </section>
  )



}
export default Home