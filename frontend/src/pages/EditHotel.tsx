import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";


const EditHotel = () => {
    const { hotelId } = useParams();
    const { showToast } = useAppContext();

    const { data: hotel } = useQuery("fetchMyHotelById", () => apiClient.fetchMyHotelById(hotelId || ""), {
        // it will only run if we have hotelId
        enabled: !!hotelId,
    });


    const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
        onSuccess: () => {
            showToast({
                message: "Hotel updated successfully",
                type: "SUCCESS",
            });
        },
        onError: (error: Error) => {
            showToast({
                message: error.message,
                type: "ERROR",
            });
        },
    });

    const handelSave = (hotelFormData: FormData) => {
        mutate(hotelFormData);
    };

  return (
    <ManageHotelForm hotel={hotel} onSave={handelSave} isLoading={isLoading}/>
  )
}

export default EditHotel
