export const userPurchasedCourses = async () => {
    console.log(localStorage.getItem("userId"),'localstorageeeeeeeeeeeeee');
    
    const response = await fetch("http://localhost:3000/api/user/purchasedCourses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        userId: localStorage.getItem("userId") || '',
      },
    });
    return response.json()

    // const purchasedCourses = await response.json();
    // console.log(purchasedCourses,'purchased Coursessssss');
    // setpurchasedCourses(purchasedCourses.purchasedCourses.purchasedCourses)
  };
