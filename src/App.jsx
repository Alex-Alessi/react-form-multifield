import { useState } from "react";

function App() {
  const [titleField, setTitleField] = useState("");
  const [articleList, setArticleList] = useState([]);

  const handleInsertPostSubmit = (e) => {
    e.preventDefault();

    const newArticle = {
      title: titleField,
    };

    const newArticleList = [...articleList, newArticle];
    setArticleList(newArticleList);
    setTitleField("");
  };

  const handleTitleChange = (e) => {
    setTitleField(e.target.value);
  };

  const handleDetele = (index) => {
    const newArticleList = articleList.filter(
      (article, articleIndex) => articleIndex !== index
    );
    setArticleList(newArticleList);
  };

  return (
    <>
      <div className="container">
        <section className="py-4">
          <form onSubmit={handleInsertPostSubmit}>
            <h4>Insert form</h4>
            <div className="row">
              <div className="col-4">
                <label className="form-label" htmlFor="post-title">
                  Titolo
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="post-title"
                  value={titleField}
                  onChange={handleTitleChange}
                />
              </div>

              <div className="col-12">
                <button className="btn btn-success my-2">Crea post</button>
              </div>
            </div>
          </form>
        </section>
        <section>
          <h4>Post list</h4>
          <div className="row">
            {articleList.map((article, index) => (
              <div key={index} className="col-4 my-2">
                <div className="card">
                  <button
                    className="btn btn-danger col-4"
                    key={index}
                    onClick={() => handleDetele(index)}
                  >
                    delete
                  </button>
                  <div className="card-body">
                    <h2>{article.title}</h2>
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
