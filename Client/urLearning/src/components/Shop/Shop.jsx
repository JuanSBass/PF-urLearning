import React from "react";
import { useDispatch } from "react-redux";



export default function Shop() {

    const dispatch = useDispatch();
    const handleRemove = () => {
        dispatch(RemoveItemCart(id))
    }



    return (


        <div>
            <div className="">
            </div>
            <div className="">
                <h4>You have not added any course to your cart yet</h4>
                <p>
                    You can add Courses to your cart by clicking on add to cart
                    button that appears in the detail of each course.
                </p>
            </div>
        </div>

    );
}