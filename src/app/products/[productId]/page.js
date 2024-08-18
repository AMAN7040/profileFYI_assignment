import AddCart from "@/app/components/AddCart";
import { fetchProductDetails } from "@/lib/api";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

export default async function ProductInfoPage({ params }) {
  const { productId } = params;
  const { success, data, message } = await fetchProductDetails(productId);

  if (!success) {
    return (
      <main className="flex justify-center items-center w-full min-h-screen bg-gray-100">
        <div className="text-center p-4">
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="text-lg mt-2">{message}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col lg:flex-row justify-around w-[80%] mx-auto px-[1rem] py-[2rem] my-[5rem] ">
      <div className="lg:w-2/5 w-full mb-8 lg:mb-0">
        <Image
          src={data.thumbnail}
          alt={`Thumbnail of ${data.title}`}
          width={350}
          height={350}
          className="object-cover w:[50%] md:w-full h-auto mb-4 shadow-md mx-[1rem]"
        />
        <div className="grid grid-cols-4 gap-2 mt-4">
          {data.images.map((image, index) => (
            <Image
              key={image} // Ensure image URLs are unique or use another unique identifier
              src={image}
              alt={`Additional image ${index + 1} of ${data.title}`}
              width={200}
              height={200}
              className="object-cover shadow-lg mx-[1rem]"
            />
          ))}
        </div>
      </div>
      <div className="lg:w-2/5 w-full">
        <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
        <p className="text-md mb-4">
          Description -  <br></br>
          {data.description}
        </p>
        <p className="text-lg font-semibold mb-2">Price: ${data.price}</p>
        <p className="text-md mb-2">
          <strong>Brand:</strong> {data.brand}
        </p>
        <p className="text-md mb-2">
          <strong>Category:</strong> {data.category}
        </p>
        <p className="text-md mb-2">
          <strong>Ratings:</strong> {data.ratings}
        </p>
        <p className="text-md mb-4">
          <strong>Warranty Information:</strong> {data.warrantyInformation}
        </p>

        <h2 className="text-lg font-semibold mb-2">Reviews</h2>
        <div className="space-y-4 mb-[2rem]">
          {data.reviews.map((review, index) => (
            <div key={index} className="p-4 border rounded bg-white shadow-sm">
              <p className="font-semibold">{review.reviewerName}</p>
              <p className="text-sm text-gray-600">
                {formatDistanceToNow(new Date(review.date), {
                  addSuffix: true,
                })}
              </p>
              <p className="mt-2">{review.comment}</p>
            </div>
          ))}
        </div>

        <AddCart item={data} className="mt-[5rem]" />
      </div>
    </main>
  );
}
