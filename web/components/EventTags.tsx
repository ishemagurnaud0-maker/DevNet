

const EventTags = ({tags}: {tags: string[]}) => {
  return (
    <div className="flex flex-row gap-1.5 flex-warp">
        {tags.map((tag) => (
            <div className='pill' key={tag}>
                {tag}
            </div>
        ))}
    </div>
  )
}

export default EventTags