import React from 'react'
import { Link } from 'react-router-dom'

function Tree2() {
    return (
        <div class="tree-diagram">
            <ul>
                <li>
                    <Link to="/profile">
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                        <div>
                            <strong>Catherine Chen</strong><br />
                            You
                        </div>
                    </Link>
                    <ul>
                        <li>
                            <Link to="/profile">
                                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                                <div>
                                    <strong>Catherine Chen</strong><br />
                                    You
                                </div>
                            </Link>
                            <ul>
                                <li>
                                    <Link to="/profile">
                                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                                        <div>
                                            <strong>Catherine Chen</strong><br />
                                            You
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/profile">
                                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                                        <div>
                                            <strong>Catherine Chen</strong><br />
                                            You
                                        </div>
                                    </Link>
                                </li>
                                ...
                            </ul>
                        </li>
                        <li>
                            <Link to="/profile">
                                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                                <div>
                                    <strong>Catherine Chen</strong><br />
                                    You
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile">
                                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                                <div>
                                    <strong>Catherine Chen</strong><br />
                                    You
                                </div>
                            </Link>
                        </li>
                        ...
                    </ul>
                </li>
                
            </ul>
        </div>
    );
}

export default Tree2;