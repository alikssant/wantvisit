import { useEffect } from "react";
import { usePlaceStore } from "../store/usePlaceStore";
import { PackageIcon, PlusCircleIcon, RefreshCwIcon } from "lucide-react";
import PlaceCard from "../components/PlaceCard";
function HomePage() {
  const { places, loading, error, fetchPlaces } = usePlaceStore();

  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <button className="btn btn-primary">
          <PlusCircleIcon className="size-5 mr-2" />
          Add Place
        </button>
        <button className="btn btn-ghost btn-circle" onClick={fetchPlaces}>
          <RefreshCwIcon className="size-5" />
        </button>
      </div>
      {error && <div className="alert alert-error mb-8">{error}</div>}

      {places.length === 0 && !loading && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          <div className="bg-base-100 rounded-full p-6">
            <PackageIcon className="size-12" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold ">No places were found</h3>
            <p className="text-gray-500 max-w-sm">
              Get started by adding your first places to visit
            </p>
          </div>
        </div>
      )}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      )}
    </main>
  );
}
export default HomePage;
