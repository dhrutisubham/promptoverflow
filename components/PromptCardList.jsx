import PromptCard from "./PromptCard";

const PromptCardList=({data, handleTagClick, handleEdit, handleDelete})=>{
    return (
      <div className="mt-16 prompt_layout">
        {
          data && data.map(prompt=>(
            <PromptCard
              key={prompt._id}
              post={prompt}
              handleTagClick={handleTagClick}

            ></PromptCard>
          ))
        }
      </div>
    )
  }

  export default PromptCardList;