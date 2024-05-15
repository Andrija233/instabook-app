import { useForm } from "react-hook-form";
import  DatePicker  from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
    hotelId: string;
    pricePerNight: number;
}

type GuestInfoFormData = {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
}

const GuestInfoForm = ({hotelId, pricePerNight}: Props) => {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const {watch, register, handleSubmit, setValue, formState: {errors}} = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount
    }
  });
  
  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues("", data.checkIn, data.checkOut, data.adultCount, data.childCount);
    navigate("/sign-in",{
        state: {
            // bringing user back to this page after he signs in
            from: location
        }
    })
  }

  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues("", data.checkIn, data.checkOut, data.adultCount, data.childCount);
    navigate(`/hotel/${hotelId}/booking`);
  }

  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4">
      <h3 className="text-md font-bold">${pricePerNight}/night</h3>
      <form onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}>
        <div className="grid grid-cols-1 items-center gap-4">
            <div>
                <DatePicker
                    required
                    selected={checkIn}
                    onChange={(date) => setValue("checkIn",date as Date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check-in Date"
                    className="min-w-full bg-white p-2 focus:outline-none"
                    wrapperClassName="min-w-full"
                />
            </div>
            <div>
                <DatePicker
                    required
                    selected={checkOut}
                    onChange={(date) => setValue("checkOut",date as Date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check-out Date"
                    className="min-w-full bg-white p-2 focus:outline-none"
                    wrapperClassName="min-w-full"
                />
            </div>
            <div className="flex bg-white px-2 py-1 gap-2">
                <label className="items-center flex">
                    Adults:
                    <input
                        type="number"
                        min={1}
                        max={20}
                        {...register("adultCount", { required: "Number of Adults is required", min: { value: 1, message: "Number of Adults must be at least 1"}, valueAsNumber: true, max: { value: 20, message: "Number of Adults must be at most 20"} })}
                        className="w-full focus:outline-none p-1 font-bold"
                    />
                </label>
                <label className="items-center flex">
                    Children:
                    <input
                        type="number"
                        min={0}
                        max={20}
                        {...register("childCount", { required: "Number of Children is required", min: { value: 0, message: "Number of Children must be at least 0"}, valueAsNumber: true, max: { value: 20, message: "Number of Children must be at most 20"} })}
                        className="w-full focus:outline-none p-1 font-bold"
                    />
                </label>
                {errors.adultCount && (
                    <span className="text-red-500 font-semibold text-sm">{errors.adultCount.message}</span>
                )}
                {errors.childCount && (
                    <span className="text-red-500 font-semibold text-sm">{errors.childCount.message}</span>
                )}
            </div>
            {isLoggedIn ? (
                <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">Book Now</button>
                ) : (
                <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">Sign in to Book</button>
            )}
        </div>
      </form>
    </div>
  )
}

export default GuestInfoForm
