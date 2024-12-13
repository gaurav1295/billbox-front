// pages/collect-info.js
import { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";

export default function CollectInfo() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { phone } = router.query;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSaveInfo = async () => {
    if (!isLoaded || !user) return;

    try {
      // Update user profile in Clerk
      await user.update({
        firstName: fullName.split(" ")[0],
        lastName: fullName.split(" ")[1] || "",
        primaryEmailAddressId: email,
        // phoneNumber: phone,
      });

      // Redirect to dashboard or home
      router.push("/dashboard");
    } catch (err) {
    //   setError(err.errors[0]?.message || "Failed to update user profile");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Complete Your Profile</h1>
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSaveInfo}>Save Info</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
