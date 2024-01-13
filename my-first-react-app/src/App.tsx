import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Header } from "./components/Header"
import "./scss/App.scss";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Articles } from "./components/Articles";
import { ArticleCardId } from "./components/ArticleCardId";
import { MainPage } from "./components/MainPage";
import { ArticleCreate } from "./components/ArticleCreate";
import { Footer } from "./components/Footer";

export const App = () => {
  return <BrowserRouter>
    <Provider store={store}>
      <Header />
      <main className="container__main">
        <Routes>
          <Route path="/" Component={MainPage}></Route>
          <Route path="/articles" Component={Articles}></Route>
          <Route path='/articles/:id' Component={ArticleCardId}></Route>
          <Route path="/create_article" Component={ArticleCreate}></Route>
        </Routes>
      </main>
      <Footer/>
    </Provider>
  </BrowserRouter>
}