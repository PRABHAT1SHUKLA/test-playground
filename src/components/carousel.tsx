const data = [
  "https://i.pinimg.com/736x/68/8d/d3/688dd325dbbdc238f4b70caffe77a5af.jpg",
  "https://static.vecteezy.com/system/resources/thumbnails/025/067/762/small_2x/4k-beautiful-colorful-abstract-wallpaper-photo.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4jwllqfo8Yvt0v5mpLhvJLWaAeoVzQ_aFHA&s",
  "https://i.etsystatic.com/32237469/r/il/72bad1/4009560313/il_fullxfull.4009560313_q4ps.jpg",
];

const Carousel = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {data.map((url, i) => (
        <img
          key={i}
          src={url}
          alt={`Image ${i + 1}`}
          className="h-[300px] w-[300px] object-cover rounded-lg shadow-lg"
        />
      ))}
    </div>
  );
};

export default Carousel;
