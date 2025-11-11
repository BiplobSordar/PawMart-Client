
export const handleError = (err) => {

  if (err?.code?.startsWith("auth/")) {
    return handleFirebaseError(err.code);
  }

  if (err?.response?.data?.message) {
    return err.response.data.message;
  }

  if (err?.response?.data?.error) {
    return err.response.data.error;
  }


  if (err?.message?.includes("Network Error")) {
    return "Network error. Please check your internet connection.";
  }

 
  return "Something went wrong. Please try again.";
};


const handleFirebaseError = (code) => {
  switch (code) {
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/user-disabled":
      return "This account has been disabled. Please contact support.";
    case "auth/user-not-found":
      return "No user found with this email.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/invalid-credential":
      return "Invalid email or password. Please check your credentials.";
    case "auth/email-already-in-use":
      return "This email is already registered.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/popup-closed-by-user":
      return "Login popup closed before completion.";
    case "auth/cancelled-popup-request":
      return "Multiple login popups detected. Please try again.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later.";
    default:
      return "Something went wrong. Please try again.";
  }
};
