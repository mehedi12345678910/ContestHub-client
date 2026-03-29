import { useForm } from "react-hook-form";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const AddContest = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    
    const contestData = {
      contestName: data.name,

      image: data.image,
      description: data.description,
      price: parseInt(data.price),
      prize: parseInt(data.prize),
      instruction: data.instruction,
      contestType: data.type,
      deadline: data.deadline,
      attendance: 0,
      status: "Pending",
      creatorName: user?.displayName,
      creatorImage: user?.photoURL,
      creatorEmail: user?.email,
    };
    console.log(contestData);
    axiosSecure.post("/contests", contestData).then((res) => {
      
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Contest added successfully!",
        showConfirmButton: false,
        timer: 2000,
      });
      reset();
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
                defaultValue=""
                {...register("type", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled value="">
                  Select your category
                </option>
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

export default AddContest;
