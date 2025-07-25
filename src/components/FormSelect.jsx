
function FormSelect({label, id, name, options, value, onChange, required=true}) {
    return (
        <div>
            <label className="col-form-label" htmlFor={id}>{label}</label>
            <select value={value} onChange={onChange}>
                {options.map(
                    (o) => (
                        <option value={o[valueKey]}>{o.label}</option>
                    )
                )}

                <option value="">Selecione...</option>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
                <option value="OTHER">OTHER</option>
                <option value="NOT_SPECIFY">NOT_SPECIFY</option>
            </select>


            <label className="col-form-label" htmlFor={id}>{label}</label>
            <div>
                <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="form-control"
                style={{width: "300px"}}
                required={required}
                />
            </div>
        </div>
    );
}

export default FormSelect;