import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  signInWithGoogle,
  signOutUser,
  auth,
} from "../lib/firebase_user_authentication.js";
import { onAuthStateChanged } from "firebase/auth";

const SignIn = () => {
  const [user, setUser] = useState(null);
  const [userLoginOpen, setUserLoginOpen] = useState(false);
  const [userLoginTab, setUserLoginTab] = useState("user");
  const [presidentCode, setPresidentCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //User signIn Authentication details using firebase authentication
  useEffect(() => {
    try {
      const handleAuthChange = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          sessionStorage.setItem("firebase-admin-email", user?.email);
          user && setIsLoggedIn(true);
        }
        return () => handleAuthChange();
      });
    } catch (error) {
      console.error({ message: error.message });
    }
  }, []);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("admin-login-data"));
    const authenticatedUserEmail = sessionStorage.getItem(
      "firebase-admin-email"
    );
    if (user?.email === authenticatedUserEmail && user?.role === "admin") {
      setIsAdmin(true);
    }
  }, []);

  //Varification for club president
  const verifyUser = async () => {
    setIsVerifying(true);
    setVerifyError("");
    try {
      // backend verification
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/v1/auth/president/verify`,
        {
          method: "POST",
          body: JSON.stringify({ accessToken: presidentCode }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Verification failed");
      }
      const [data] = await response.json();
      if (data) {
        sessionStorage.setItem("admin-login-data", JSON.stringify(data));
        localStorage.setItem("presidentCode" , presidentCode);
        await signInWithGoogle();
        if (
          data?.role === "admin" &&
          data?.email === sessionStorage.getItem("firebase-admin-email")
        ) {
          setIsAdmin(true);
        }
      } else {
        throw new Error("Incorrect access token");
      }
      setUserLoginOpen(false);
      setIsLoggedIn(true);
    } catch (e) {
      console.error(e);
      setVerifyError(e.message || "Verification failed");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div>
      {/*User Login Section*/}
      <button
        onClick={() => {
          setUserLoginOpen(!userLoginOpen);
        }}
        className="h-10 w-10 cursor-pointer p-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
        aria-label="Open login"
      >
        {!user ? (
          <svg
            className="h-full w-full dark:fill-white fill-primary"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
          >
            <path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" />
          </svg>
        ) : (
          <img
            src={user?.photoURL}
            alt={user?.displayName || "User"}
            className="h-full w-full rounded-full"
          />
        )}
      </button>
      {userLoginOpen && !isLoggedIn && (
        <div
          id="login-modal"
          className="w-full md:w-[27%] shadow-2xl bg-white border border-border dark:border-charcoal-card/90 dark:bg-charcoal-card absolute top-[4rem] right-0 md:right-2 z-50 p-4 rounded-b-lg space-y-5"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold dark:text-white text-charcoal">
              Login
            </h3>
            <button
              onClick={() => setUserLoginOpen(false)}
              className="cursor-pointer p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white"
              aria-label="Close login"
            >
              ✕
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setUserLoginTab("user");
                setVerifyError("");
              }}
              className={`md:flex-1 px-3 py-2 rounded-md text-sm font-medium transition border ${
                userLoginTab === "user"
                  ? "bg-primary text-white border-primary"
                  : "bg-gray-100 dark:bg-gray-800 dark:text-white border-gray-200 dark:border-gray-700"
              }`}
            >
              Club Member
            </button>
            <button
              onClick={() => {
                setUserLoginTab("president");
                setVerifyError("");
              }}
              className={`md:flex-1 px-3 py-2 rounded-md text-sm font-medium transition border ${
                userLoginTab === "president"
                  ? "bg-primary text-white border-primary"
                  : "bg-gray-100 dark:bg-gray-800 dark:text-white border-gray-200 dark:border-gray-700"
              }`}
            >
              Club President
            </button>
          </div>

          {userLoginTab === "user" && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Sign in to personalize your ClubHub experience.
              </p>
              <button
                onClick={async () => {
                  try {
                    await signInWithGoogle();
                    setUserLoginOpen(false);
                  } catch (e) {
                    console.error("Google sign-in error", e.message);
                  }
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark transition"
              >
                <svg
                  className="h-5 w-5 bg-white rounded-full"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                >
                  <path className="fill-charcoal" d="M564 325.8C564 467.3 467.1 568 324 568C186.8 568 76 457.2 76 320C76 182.8 186.8 72 324 72C390.8 72 447 96.5 490.3 136.9L422.8 201.8C334.5 116.6 170.3 180.6 170.3 320C170.3 406.5 239.4 476.6 324 476.6C422.2 476.6 459 406.2 464.8 369.7L324 369.7L324 284.4L560.1 284.4C562.4 297.1 564 309.3 564 325.8z" />
                </svg>
                Continue with Google
              </button>
            </div>
          )}

          {userLoginTab === "president" && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Enter the club president access code to continue. You will
                verify with Google afterwards.
              </p>
              <input
                type="password"
                value={presidentCode}
                onChange={(e) => {
                  setPresidentCode(e.target.value);
                  setVerifyError("");
                }}
                placeholder="Access code"
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 outline-none focus:ring-1 focus:ring-primary"
              />
              {verifyError && (
                <div className="text-sm text-red-600 dark:text-red-400">
                  {verifyError}
                </div>
              )}
              <button
                disabled={isVerifying || !presidentCode.trim()}
                onClick={verifyUser}
                className={`w-full px-4 py-2 rounded-md text-white transition ${
                  isVerifying || !presidentCode.trim()
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary hover:bg-primary-dark"
                }`}
              >
                {isVerifying ? "Verifying..." : "Verify & Continue with Google"}
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Contact with the website owner(s) for access code.{" "}
                <a href="#" className="border-b-2 border-primary">
                  Email us
                </a>
              </p>
            </div>
          )}
        </div>
      )}

      {/* loggedIn user details Section*/}
      {user && userLoginOpen && isLoggedIn && (
        <div className="custom-scrollbar min-w-sm md:max-w-[27%] md:max-h-[70vh] max-h-[80vh] overflow-y-scroll shadow-2xl bg-white border border-border dark:border-charcoal-card/90 dark:bg-charcoal-card absolute top-[4rem] md:right-2 right-0 z-50 p-4 rounded-b-lg space-y-5">
          <div className="flex items-center flex-col gap-2">
            <button
              onClick={() => setUserLoginOpen(false)}
              className="cursor-pointer absolute right-4 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white"
              aria-label="Close login"
            >
              ✕
            </button>
            {user?.photoURL && (
              <img
                src={user?.photoURL}
                alt={user?.displayName.split(" ")[-1] || "User"}
                className="h-20 w-20 rounded-full"
              />
            )}
            <span className="text-sm dark:text-white text-charcoal">
              {user.displayName}
            </span>
            <span className="text-sm dark:text-white text-charcoal">
              {user.email}
            </span>
          </div>
          {isAdmin && (
            <Link
              to="/admin/dashboard"
              state={{
                accessToken:
                  localStorage.getItem("presidentCode") || presidentCode,
                presidentData : JSON.parse(sessionStorage.getItem("admin-login-data"))
              }}
              className="block text-center w-full md:py-2 py-1.5 rounded-lg bg-primary hover:bg-primary-light transition dark:text-white"
            >
              Admin Panel
            </Link>
          )}
          <button
            onClick={() => {
              signOutUser();
              setUser(null);
              setIsLoggedIn(false);
              setUserLoginOpen(false);
              setIsAdmin(false);
              sessionStorage.removeItem("firebase-admin-email");
              sessionStorage.removeItem("admin-login-data");
              localStorage.removeItem("presidentCode");
            }}
            className="w-full md:py-2 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition dark:text-white cursor-pointer"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default SignIn;
