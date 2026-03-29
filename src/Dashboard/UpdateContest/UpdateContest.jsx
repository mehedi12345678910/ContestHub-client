import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";

const UpdateContest = () => {
  const loadedContest = useLoaderData();
  const axiosSecure = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const contestData = {
      contestName: data.name,
      image: data.image,
      description: data.description,
      price: parseInt(data.price),
      prize: parseInt(data.prize),
      instruction: data.instruction,
      contestType: data.type,
      deadline: data.deadline,
    };


    axiosSecure
      .put(`/contests/${loadedContest?._id}`, contestData)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Contest updated successfully!",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Contest name</span>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                defaultValue={loadedContest?.contestName}
                placeholder="Contest name"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-600">Contest name is required</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Contest type</span>
              </label>
              <select
                defaultValue={loadedContest?.contestType}
                {...register("type", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="Business Contest">Business Contest</option>
                <option value="Medical Contest">Medical Contest</option>
                <option value="Article Writing">Article Writing</option>
                <option value="Gaming">Gaming</option>
              </select>
              {errors.type && (
                <span className="text-red-600">Contest type is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                {...register("price", { required: true })}
                defaultValue={loadedContest?.price}
                type="number"
                placeholder="price"
                className="input input-bordered"
              />
              {errors.price && (
                <span className="text-red-600">Contest price is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Prize Money</span>
              </label>
              <input
                {...register("prize", { required: true })}
                defaultValue={loadedContest?.prize}
                type="number"
                placeholder="Prize Money"
                className="input input-bordered"
              />
              {errors.prize && (
                <span className="text-red-600">Prize Money is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Contest Deadline</span>
              </label>
              <input
                {...register("deadline", { required: true })}
                defaultValue={loadedContest?.deadline}
                type="date"
                placeholder="Contest Deadline"
                className="input input-bordered"
              />
              {errors.deadline && (
                <span className="text-red-600">
                  Contest Deadline is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Task Submission instruction</span>
              </label>
              <input
                {...register("instruction", { required: true })}
                defaultValue={loadedContest?.instruction}
                type="text"
                placeholder="Task Submission instruction"
                className="input input-bordered"
              />
              {errors.instruction && (
                <span className="text-red-600">
                  Task Submission instruction is required
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                {...register("image", { required: true })}
                defaultValue={loadedContest?.image}
                type="text"
                placeholder="Image"
                className="input input-bordered"
              />
              {errors.image && (
                <span className="text-red-600">Image is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Contest Description</span>
              </label>
              <textarea
                {...register("description", { required: true })}
                defaultValue={loadedContest?.description}
                className="textarea textarea-bordered"
                placeholder="Contest Description"
              ></textarea>
              {errors.description && (
                <span className="text-red-600">
                  Contest Description is required
                </span>
              )}
            </div>
          </div>
          {/* submit button in the bottom */}
          <input
            className="btn btn-block btn-primary mt-8"
            type="submit"
            value="Add Contest"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateContest;
