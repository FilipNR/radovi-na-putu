import React from 'react';

function TypeSelector({ checkedType, handleChange, searchItems }) {
    return (
        <section className='type-selector'>
            <form>
                <div className="search-container-div">
                    <label className="search-container">
                        <input type="search" name="search" onChange={(e => searchItems(e.target.value))} />
                        <div type="submit"><img src="/search.svg" height={"60%"} alt="" /></div>
                    </label>
                </div>
                <div className="column-container">
                    <div>
                        <label className="container"><span>Radovi</span>
                            <input type="checkbox" defaultChecked={checkedType[0]} onChange={() => handleChange(0)} />
                            <span className="checkmark"></span>
                            <span><img src="/radovi.png" width={"14%"} alt="" /></span>
                        </label>
                        <label className="container"><span>Zabrane</span>
                            <input type="checkbox" defaultChecked={checkedType[1]} onChange={() => handleChange(1)} />
                            <span className="checkmark"></span>
                            <span><img src="/zabrane.png" width={"14%"} alt="" /></span>
                        </label>
                    </div>
                    <div>
                        <label className="container"><span>Obustave</span>
                            <input type="checkbox" defaultChecked={checkedType[2]} onChange={() => handleChange(2)} />
                            <span className="checkmark"></span>
                            <span><img src="/obustave.png" width={"14%"} alt="" /></span>
                        </label>
                        <label className="container"><span>Odroni</span>
                            <input type="checkbox" defaultChecked={checkedType[3]} onChange={() => handleChange(3)} />
                            <span className="checkmark"></span>
                            <span><img src="/odroni.png" width={"14%"} alt="" /></span>
                        </label>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default TypeSelector