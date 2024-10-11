import Link from "next/link";

const Form = ({ type, handleSubmit, post, setPost, submitting }) => {
  // console.error(submitting)
  return (
    <section className="flex-col flex flex-start w-full max-w-full ">
      <h1 className="head_text text-left blue_gradient">{type} Post</h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-Powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full glassmorphism max-w-2xl flex flex-col gap-7"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            required
            className="form_textarea"
            placeholder="Write your prompt here..."
          ></textarea>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tags{" "}
            <span className="font-normal">{`(#webdevelopment, #food, #lifestyle)`}</span>
          </span>
          <textarea
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            required
            className="form_input"
            placeholder="#tag"
          ></textarea>
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            className={`px-5 py-1.5 bg-primary-orange rounded-full text-white`}
            type="submit"
            disabled={submitting}
          >
            {submitting ? `...` : `${ type }`}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
