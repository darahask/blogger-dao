import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { getBlogs, updateBlog, deleteBlog, postBlog } from "../scripts/Blogs";

export default function Blogs() {
    let ref = useRef();
    let [blogs, setBlogs] = useState([]);
    let [selected, setSelected] = useState({ index: -1, text: "" });

    const handleDelete = async (i) => {
        let val = await deleteBlog(i);
        if (val) loadData();
    };

    const handleUpdate = (i) => {
        ref.current.value = blogs[i];
        setSelected({ index: i, text: blogs[i] });
    };

    const handleSave = async () => {
        if (selected.index === -1) {
            let text = ref.current.value;
            let res = await postBlog(text);
            if (res) loadData();
            ref.current.value = "";
        } else {
            let text = ref.current.value;
            let res = await updateBlog(selected.index, text);
            setSelected({ index: -1, text: "" });
            if (res) loadData();
            ref.current.value = "";
        }
    };

    const loadData = async () => {
        let res = await getBlogs();
        if (res) setBlogs(res);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <div className="container mt-3">
                {blogs.map((val, ind) => {
                    return (
                        <div key={ind} className="card mb-3">
                            <div className="card-body">
                                <ReactMarkdown children={val} />
                            </div>
                            <div className="card-footer">
                                <i
                                    className="fa-solid fa-pen"
                                    onClick={() => handleUpdate(ind)}
                                ></i>
                                <i
                                    className="fa-solid fa-trash ms-3"
                                    onClick={() => handleDelete(ind)}
                                ></i>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-3 fixbottom">
                <div className="card">
                    <div className="card-header">Markdown Supported</div>
                    <div className="card-body">
                        <div className="card-text">
                            <textarea
                                style={{ width: "100%" }}
                                ref={ref}
                                rows="4"
                            ></textarea>
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
