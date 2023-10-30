const page = ({ params }: { params: { slug: string[] } }) => {

    setTimeout(() => console.log(params.slug), 3000)

    return (
        <>
            {params.slug.map((slug, index) => (
                <div key={index}>{slug}</div>
            ))}
        </>
    )
}

export default page
