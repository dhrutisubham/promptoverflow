import Feed from '@components/Feed'
const Home = () => {
  return (
    <section classname="w-full flex-center flex-col"> 
        <h1 className="head_text text-center">
            Prompting and Sharing 
            <br className="max-md"/>
            <span className="orange_gradient text-center">AI-Powered Prompts!</span>
        </h1>
        <p className="desc text-center">
        Unleash your creativity with PromptOverFLow, where AI sparks imagination and connects creators worldwide. Get ready to be inspired and share your brilliance!
        </p>

        <Feed/>

    </section>
  )
}

export default Home;