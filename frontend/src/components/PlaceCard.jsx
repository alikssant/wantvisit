import { EditIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";

function PlaceCard({ place }) {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      {/* Place image */}
      <figure className="relative pt-[56.25%]">
        <img
          src={place.image}
          alt={place.name}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        {/* Place info */}
        <h2 className="card-title text-lg font-semibold">{place.name}</h2>
        <p className="text-2xl font-bold text-primary">{place.country}</p>

        {/* Card actions */}
        <div className="card-actions justify-end mt-4">
          <Link
            to={`/product/${place.id}`}
            className="btn btn-sm btn-info btn-outline"
          >
            <EditIcon className="size-4" />
          </Link>

          <button className="btn btn-sm btn-error btn-outline">
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaceCard;
