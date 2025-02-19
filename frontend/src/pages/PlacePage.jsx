import { useNavigate, useParams } from "react-router-dom";
import { usePlaceStore } from "../store/usePlaceStore";
import { useEffect } from "react";
import { ArrowLeftIcon, SaveIcon, Trash2Icon } from "lucide-react";

function PlacePage() {
  const {
    currentPlace,
    formData,
    setFormData,
    loading,
    error,
    fetchPlace,
    updatePlace,
    deletePlace,
  } = usePlaceStore();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchPlace(id);
  }, [fetchPlace, id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete the place?")) {
      await deletePlace(id);
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button onClick={() => navigate("/")} className="btn btn-ghost mb-8">
        <ArrowLeftIcon className="size-4 mr-2" />
        Back to Homepage
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* PRODUCT IMAGE */}
        <div className="rounded-lg overflow-hidden shadow-lg bg-base-100">
          <img
            src={currentPlace?.image}
            alt={currentPlace?.name}
            className="size-full object-cover"
          />
        </div>

        {/* Place form */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">Edit</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updatePlace(id);
              }}
              className="space-y-6"
            >
              {/* place name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Place Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter place name"
                  className="input input-bordered w-full"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              {/* place location */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Location
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Location"
                  className="input input-bordered w-full"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                />
              </div>

              {/* Place image url */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Image URL
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>

              {/* Form actions */}
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="btn btn-error"
                >
                  <Trash2Icon className="size-4 mr-2" />
                  Delete
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    loading ||
                    !formData.name ||
                    !formData.country ||
                    !formData.image
                  }
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
                      <SaveIcon className="size-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PlacePage;
