import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  signInWithGoogle,
  signOutUser,
  onAuthStateChanged,
  auth,
} from "../lib/firebase_user_authentication.js";

const SignIn = () => {
  const [user, setUser] = useState(null);
  const [userLoginOpen, setUserLoginOpen] = useState(false);
  const [userLoginTab, setUserLoginTab] = useState("user");
  const [presidentCode, setPresidentCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //User signin using firebase authentication
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      sessionStorage.setItem("firebase-admin-email", user?.email);
      user && setIsLoggedIn(true);
    });
    return () => unsub();
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
      sessionStorage.setItem("admin-login-data", JSON.stringify(data));
      if (data) {
        await signInWithGoogle();
        if (data?.role === "admin" && data?.email === sessionStorage.getItem("firebase-admin-email")) {
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
        className="cursor-pointer p-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
        aria-label="Open login"
      >
        {!user ? (
          <svg
            className="h-8 w-8 dark:fill-white fill-primary"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
          >
            <path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" />
          </svg>
        ) : (
          <img
            src={user?.photoURL}
            alt={user?.displayName || "User"}
            className="h-8 w-8 rounded-full"
          />
        )}
      </button>
      {userLoginOpen && !isLoggedIn && (
        <div
          id="login-modal"
          className="custom-scrollbar min-w-sm md:max-w-[27%] md:max-h-[70vh] max-h-[80vh] overflow-y-scroll shadow-2xl bg-white border border-border dark:border-charcoal-card/90 dark:bg-charcoal-card absolute top-[4rem] md:right-2 right-0 z-50 p-4 rounded-b-lg space-y-5"
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
              className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition border ${
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
              className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition border ${
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
                onClick={() => {
                  try {
                    signInWithGoogle();
                    setUserLoginOpen(false);
                  } catch (e) {
                    console.error("Google sign-in error", e.message);
                  }
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark transition"
              >
                <svg
                  className="h-5 w-5 bg-white rounded-sm"
                  viewBox="0 0 533.5 544.3"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#4285F4"
                    d="M533.5 278.4c0-18.6-1.7-36.6-5-54H272v102.2h146.9c-6.3 34.1-25.2 63-53.9 82.3v68h87.2c51 47 80.3 116.2 80.3 197.6z"
                    transform="translate(0 -70)"
                  />
                  <path
                    fill="#34A853"
                    d="M272 614.3c72.7 0 133.7-24 178.3-65.4l-87.2-68c-24.2 16.2-55.1 25.8-91.1 25.8-69.9 0-129.2-47.2-150.5-110.7H31.6v69.5C76.1 562.2 167.2 614.3 272 614.3z"
                    transform="translate(0 -70)"
                  />
                  <path
                    fill="#FBBC05"
                    d="M121.5 396c-5.6-16.2-8.8-33.5-8.8-51.3s3.2-35.1 8.8-51.3V224H31.6C11.3 264.5 0 311.3 0 361s11.3 96.5 31.6 137l89.9-69.5z"
                    transform="translate(0 -70)"
                  />
                  <path
                    fill="#EA4335"
                    d="M272 210.2c39.5 0 75 13.6 102.9 40.2l77.2-77.2C405.5 117.2 344.5 94 272 94 167.2 94 76.1 146.1 31.6 224l89.9 69.5C142.8 257.4 202.1 210.2 272 210.2z"
                    transform="translate(0 -70)"
                  />
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
              className="block text-center w-full md:py-2 py-1.5 rounded-lg bg-primary hover:bg-primary-light transition dark:text-white"
              to="/admin/dashboard"
            >
              Admin Panel
            </Link>
          )}
          <button
            onClick={() => {
              signOutUser();
              setIsLoggedIn(false);
              setUserLoginOpen(false);
              setIsAdmin(false);
              sessionStorage.setItem("firebase-admin-email", null);
              sessionStorage.setItem("admin-login-data", null);
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
