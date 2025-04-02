import { Header } from "./components/Header";
import "./global.css";
import styles from "./App.module.css";
import { Post, PostType } from "./components/Post";
import { Sidebar } from "./components/Sidebar";



const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/rafa-Nobre.png",
      name: "Denys Rafael Nobre",
      role: "Developer Mobile",
    },
    content: [
      { type: "paragraph", content: "Fala, galera! 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portfólio. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      { type: "link", content: "jane.design/doctorcare" },
    ],
    publishedAt: new Date("2025-3-3 19:00:00"),
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/caiomoises.png",
      name: "Caio Moisés",
      role: "Backend developer",
    },
    content: [
      { type: "paragraph", content: "Opa, Eai! 👋" },
      {
        type: "paragraph",
        content:
          "Subir um projeto no meu portfólio, é um projeto. O nome do projeto é ClinicaLab 🚀",
      },
      { type: "link", content: "jane.design/ClinicaLab" },
    ],
    publishedAt: new Date("2025-3-3 19:43:00"),
  },
];

function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                post={post} 
              />
            );
          })}
        </main>
      </div>
    </div>
  );
}

export default App;