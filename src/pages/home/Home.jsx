import { useState, useEffect } from "react";
import HeroSection from "../../components/heroSection/HeroSection";
import ListItems from "../../components/listItems/ListItems";
import PortfolioList from "../../components/PortfolioList/Portfolio";

const name = "John Doe";
const aboutme =
  "Experienced web developer creating engaging websites. Let's bring your digital vision to life!";
const technologies = ["NextJS", "React", "Tailwind CSS", "Figma", "Express"];
const projects = ["NextJS", "ReactJS", "Express"];

const Home = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [apiLoading, setApiLoading] = useState(false);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      setApiLoading(true);
      const resp = await fetch("/settings/portfolio.json");
      const data = await resp.json();
      setPortfolioData(data);
      setApiLoading(false);
    };

    fetchPortfolioData();
  }, []);

  return (
    <div>
      <HeroSection name={name} aboutme={aboutme} />
      <ListItems
        title="Technologies"
        items={technologies}
        onSelect={() => console.log("selected")}
        selectedItem={technologies[1]}
      />
      <ListItems
        title="Portfolio"
        items={projects}
        onSelect={(item) => {
          if (selectedProject.toLowerCase() === item.toLowerCase()) {
            setSelectedProject("");
          } else {
            setSelectedProject(item);
          }
        }}
        selectedItem={selectedProject}
      />
      <PortfolioList itemsList={portfolioData} selectedItem={selectedProject} />
    </div>
  );
};

export default Home;
