import { useState } from "react";

function App() {
  const [articleList, setArticleList] = useState([]);
  const [titleFieldEdit, setTitleFieldEdit] = useState("");
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const [postData, setPostData] = useState({
    title: "",
    image: "",
    content: "",
    category: "",
    published: false,
  });

  // # INSERT

  const handleInsertPostSubmit = (e) => {
    e.preventDefault();

    const newArticle = {
      ...postData,
    };

    const newArticleList = [...articleList, newArticle];
    setArticleList(newArticleList);
    setPostData({
      title: "",
      image: "",
      content: "",
      category: "",
      published: false,
    });
  };

  const handleFormChange = (e) => {
    const newPostData = {
      ...postData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };

    setPostData(newPostData);
    console.log(newPostData);
  };
  //#

  // ! DELETE
  const handleDetele = (index) => {
    const newArticleList = articleList.filter(
      (article, articleIndex) => articleIndex !== index
    );
    setArticleList(newArticleList);
  };
  // !

  // ? EDIT

  const handlePostEdit = (e) => {
    const selectedIndex = parseInt(e.target.value); //uso parseInt perchè e.target.value è una stringa
    setSelectedPostIndex(selectedIndex);

    const selectedArticle = articleList[selectedIndex];
    if (selectedArticle) {
      setTitleFieldEdit(selectedArticle.title);
    }
  };

  const handleEditPostSubmit = (e) => {
    e.preventDefault();

    if (selectedPostIndex === null) {
      alert("Seleziona un post");
      return; //se non è selezionato un post, interrompe l'if
    }

    const updatedArticles = articleList.map((article, index) => {
      if (index === selectedPostIndex) {
        return { ...article, title: titleFieldEdit };
      }
      return article;
    });

    setArticleList(updatedArticles);
    setTitleFieldEdit("");
    setSelectedPostIndex(null);
  };

  const handleEditTitleChange = (e) => {
    setTitleFieldEdit(e.target.value);
  };
  // ?

  return (
    <>
      <div className="container">
        <section className="py-4">
          <form onSubmit={handleInsertPostSubmit}>
            <h4>Insert form</h4>
            <div className="row">
              <div className="col-4">
                <label className="form-label" htmlFor="title">
                  Titolo
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={postData.title}
                  onChange={handleFormChange}
                />
              </div>

              <div className="col-4">
                <label className="form-label" htmlFor="image">
                  Immagine
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                  onChange={handleFormChange}
                />
              </div>

              <div className="col-4">
                <label className="form-label" htmlFor="content">
                  Contenuto
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="content"
                  name="content"
                  value={postData.content}
                  onChange={handleFormChange}
                />
              </div>

              <div className="col-4">
                <label className="form-label" htmlFor="category">
                  Categoria
                </label>
                <select
                  className="form-select"
                  id="category"
                  name="category"
                  value={postData.category}
                  onChange={handleFormChange}
                >
                  <option value="">Seleziona un linguaggio</option>
                  <option value="html">html</option>
                  <option value="css">css</option>
                  <option value="javascript">javascript</option>
                </select>
              </div>

              <div className="col-4">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="published"
                    name="published"
                    checked={postData.published}
                    onChange={handleFormChange}
                  />
                  <label className="form-check-label" htmlFor="published">
                    Pubblicato
                  </label>
                </div>
              </div>

              <div className="col-12">
                <button className="btn btn-success my-2">Crea post</button>
              </div>
            </div>
          </form>
        </section>
        <hr />

        {/* edit post */}
        <section className="py-4">
          <form onSubmit={handleEditPostSubmit}>
            <h4>Edit post</h4>
            <div className="row">
              <div className="col-4">
                <label className="form-label me-2" htmlFor="select-post">
                  Seleziona post da modificare
                </label>
                <select
                  onChange={handlePostEdit}
                  className="form-select"
                  id="select-post"
                >
                  <option value="">Seleziona un post</option>
                  {articleList.map((article, index) => (
                    <option value={index} key={index}>
                      {article.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-4">
                <label className="form-label" htmlFor="title">
                  Modifica Titolo
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="edit-title"
                  value={titleFieldEdit}
                  onChange={handleEditTitleChange}
                />
              </div>

              <div className="col-12">
                <button className="btn btn-warning my-2">Modifica post</button>
              </div>
            </div>
          </form>
        </section>

        <hr />

        {/* create post */}
        <section>
          <h4>Post list</h4>
          <div className="row">
            {articleList.map((article, index) => (
              <div key={index} className="col-4 my-2">
                <div className="card">
                  <button
                    className="btn btn-danger col-4"
                    onClick={() => handleDetele(index)}
                  >
                    delete
                  </button>
                  <div className="card-body">
                    <h2>{article.title}</h2>
                    <p>{article.content}</p>
                    <p>{article.category}</p>
                    <p>{article.published ? "Pubblicato" : "Non pubblicato"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
