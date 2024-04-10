import SearchSection from "@/components/SearchSection/SearchSection";
import InfoCard from "@/components/InfoCard/InfoCard";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [result, setResult] = useState({});
  const [displayInfoCard, setDisplayInfoCard] = useState<boolean | undefined>(
    undefined
  );
  const [isClear, setIsClear] = useState<boolean>(false);
  const ref = useRef(null);

  let theme: string;
  if (typeof window !== "undefined") {
    theme = localStorage.getItem("theme")! || "dark";
  }

  if (typeof document !== "undefined") {
    if (theme === "light") {
      document.querySelector("body")?.classList.add("light");
    } else {
      document.querySelector("body")?.classList.remove("light");
    }
  }

  const handleSearch = () => {
    setUsername(ref.current.value);
  };

  const getData = async () => {
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (res.status === 200) {
        const data = await res.json();
        setResult(data);
        // console.log(data);
        setDisplayInfoCard(true);
      } else {
        setDisplayInfoCard(false);
      }
    } catch (error) {
      setDisplayInfoCard(false);
    }
  };

  const [sv, setSv] = useState<string>("");
  const handleChange = (e: any) => {
    setSv(e.target.value);
    if (e.target.value) setIsClear(true);
  };

  const handleClear = () => {
    ref.current.value = "";
    setIsClear(false);
  };

  const handleSwitchTheme = () => {
    theme = theme === "dark" ? "light" : "dark";

    localStorage.setItem("theme", theme);

    if (theme === "light") {
      document.querySelector("body")?.classList.add("light");
      document.querySelector("button").innerText = "DARK";
    } else {
      document.querySelector("body")?.classList.remove("light");
      document.querySelector("button").innerText = "LIGHT";
    }
  };

  useEffect(() => {
    if (username !== "") {
      console.log("username: ", username);
      getData();
    }
  }, [username]);

  return (
    <main>
      <div className="home__container">
        <section className="navbar">
          <h1 className="navbar__title">devfinder</h1>
          <button
            suppressHydrationWarning
            onClick={handleSwitchTheme}
            className="navbar__btn"
          >
            {theme === "light" ? "DARK" : "LIGHT"}
          </button>
        </section>

        <SearchSection
          onChange={handleChange}
          onClick={handleSearch}
          inputRef={ref}
          clearSearch={isClear}
          onClear={handleClear}
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
        {/* )} {username && !displayInfoCard && ( */}

        {/* {displayInfoCard === false && ({username && !displayInfoCard && (<div className="error">User not found</div>)} */}
        {displayInfoCard === false && username && !displayInfoCard && (
          <div className="error">User not found</div>
        )}
      </div>
    </main>
  );
}
