import SearchSection from "@/components/SearchSection/SearchSection";
import InfoCard from "@/components/InfoCard/InfoCard";
import { useState, useEffect } from "react";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [result, setResult] = useState({});
  const [displayInfoCard, setDisplayInfoCard] = useState<boolean>(false);
  let getTheme: string;
  if (typeof window !== "undefined") {
    getTheme = localStorage.getItem("theme")! || "dark";
  }

  const [theme, setTheme] = useState();

  // if (typeof document !== "undefined") {
  //   if (theme === "light") {
  //     document.querySelector("body")?.classList.add("light");
  //     // document.querySelector("button").innerText = "LIGHT";
  //   } else {
  //     document.querySelector("body")?.classList.remove("light");
  //     // document.querySelector("button").innerText = "DARK";
  //   }
  // }

  const handleSwitchTheme = () => {
    console.log("run");
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
    localStorage.setItem("theme", theme);
    // theme = theme === "dark" ? "light" : "dark";

    // localStorage.setItem("theme", theme);

    // if (theme === "light") {
    //   document.querySelector("body")?.classList.add("light");
    //   // document.querySelector("button").innerText = "DARK";
    // } else {
    //   document.querySelector("body")?.classList.remove("light");
    //   // document.querySelector("button").innerText = "LIGHT";
    // }
  };

  useEffect(() => {
    setTheme(getTheme);
  }, []);

  useEffect(() => {
    if (theme === "light") {
      document.querySelector("body")?.classList.add("light");
    } else {
      document.querySelector("body")?.classList.remove("light");
    }
  }, [theme]);

  const handleSearch = async () => {
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      // console.log(res);
      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        setResult(data);
        setDisplayInfoCard(true);
      } else {
        setDisplayInfoCard(false);
        setResult({});
      }

      // setDisplayInfoCard(true);
    } catch (error) {
      setDisplayInfoCard(false);
      console.log("displayInfoCard", displayInfoCard);
    }
  };
  return (
    <main>
      <div className="home__container">
        <section className="navbar">
          <h1 className="navbar__title">devfinder</h1>
          <button onClick={handleSwitchTheme} className="navbar__btn">
            {theme === "light" ? "DARK" : "LIGHT"}
          </button>
        </section>
        <SearchSection
          onChange={(e) => setUsername(e.target.value)}
          onClick={handleSearch}
        />
        {displayInfoCard && (
          <InfoCard
            src={result?.avatar_url}
            name={result?.name}
            href={result?.html_url}
            date={result?.updated_at}
            bio={result?.bio}
            repo={result?.public_repos}
            followers={result?.followers}
            following={result?.following}
            location={result?.location}
            blog={result?.blog}
            twitter={result?.twitter_username}
            company={result?.company}
            userName={result?.login}
          />
        )}
        {username && !displayInfoCard && (
          <div className="error">User not found</div>
        )}
      </div>
    </main>
  );
}

// export default function Home() {
//   const [username, setUsername] = useState<string>("");
//   const [result, setResult] = useState({});
//   const [displayInfoCard, setDisplayInfoCard] = useState<boolean>(false);
//   let theme;
//   if (typeof window !== "undefined") {
//     theme = localStorage.getItem("theme")! || "dark";
//   }

//   if (typeof document !== "undefined") {
//     if (theme === "light") {
//       document.querySelector("body")?.classList.add("light");
//       // document.querySelector("button").innerText = "LIGHT";
//     } else {
//       document.querySelector("body")?.classList.remove("light");
//       // document.querySelector("button").innerText = "DARK";
//     }
//   }

//   const handleSwitchTheme = () => {
//     theme = theme === "dark" ? "light" : "dark";

//     localStorage.setItem("theme", theme);

//     if (theme === "light") {
//       document.querySelector("body")?.classList.add("light");
//       // document.querySelector("button").innerText = "DARK";
//     } else {
//       document.querySelector("body")?.classList.remove("light");
//       // document.querySelector("button").innerText = "LIGHT";
//     }
//   };

//   const handleSearch = async () => {
//     try {
//       const res = await fetch(`https://api.github.com/users/${username}`);
//       // console.log(res);
//       if (res.status === 200) {
//         const data = await res.json();
//         console.log(data);
//         setResult(data);
//         setDisplayInfoCard(true);
//       } else {
//         setDisplayInfoCard(false);
//         setResult({});
//       }

//       // setDisplayInfoCard(true);
//     } catch (error) {
//       setDisplayInfoCard(false);
//       console.log("displayInfoCard", displayInfoCard);
//     }
//   };
//   return (
//     <main>
//       <div className="home__container">
//         <section className="navbar">
//           <h1 className="navbar__title">devfinder</h1>
//           <button onClick={handleSwitchTheme} className="navbar__btn">
//             {theme === "light" ? "DARK" : "LIGHT"}
//           </button>
//         </section>
//         <SearchSection
//           onChange={(e) => setUsername(e.target.value)}
//           onClick={handleSearch}
//         />
//         {displayInfoCard && (
//           <InfoCard
//             src={result?.avatar_url}
//             name={result?.name}
//             href={result?.html_url}
//             date={result?.updated_at}
//             bio={result?.bio}
//             repo={result?.public_repos}
//             followers={result?.followers}
//             following={result?.following}
//             location={result?.location}
//             blog={result?.blog}
//             twitter={result?.twitter_username}
//             company={result?.company}
//             userName={result?.login}
//           />
//         )}
//         {username && !displayInfoCard && (
//           <div className="error">User not found</div>
//         )}
//       </div>
//     </main>
//   );
// }
