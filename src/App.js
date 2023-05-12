import React, { useState } from 'react';

const MyComponent = () => {
  const [w0, setW0] = useState(1.5);
  const [w1, setW1] = useState(0.5);
  const [w2, setW2] = useState(1.5);
  const [result, setResult] = useState('');

  const mat = [
    [0, 0, 0],
    [0, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
  ];

  const evaluacion = () => {
    const x1 = parseInt(document.getElementById('txtx1').value);
    const x2 = parseInt(document.getElementById('txtx2').value);

    const neti = x1 * w1 + x2 * w2 + w0;
    const sp = neti >= 0 ? 1 : 0;
    setResult(sp.toString());
  };

  const enseñar = () => {
    const actualizarPeso = () => {
      let newW0 = w0;
      let newW1 = w1;
      let newW2 = w2;
      let entrenado = false;

      while (!entrenado) {
        entrenado = true;

        for (let i = 0; i < mat.length; i++) {
          const neti = mat[i][0] * newW1 + mat[i][1] * newW2 + newW0;
          const sp = neti >= 0 ? 1 : 0;
          const er = mat[i][2] - sp;

          if (er !== 0) {
            entrenado = false;
            newW0 = newW0 + er * 1;
            newW1 = newW1 + er * mat[i][0];
            newW2 = newW2 + er * mat[i][1];
          }
        }
      }

      setW0(newW0);
      setW1(newW1);
      setW2(newW2);
      evaluacion();
    };

    actualizarPeso();
  };

  const actualizarManual = () => {
    const newW0 = parseFloat(document.getElementById('txtw0').value);
    const newW1 = parseFloat(document.getElementById('txtw1').value);
    const newW2 = parseFloat(document.getElementById('txtw2').value);

    setW0(newW0);
    setW1(newW1);
    setW2(newW2);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Evaluar</h2>
          <div className="mb-3">
            <label htmlFor="txtx1" className="form-label">
              x1:
            </label>
            <input type="text" id="txtx1" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="txtx2" className="form-label">
              x2:
            </label>
            <input type="text" id="txtx2" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="txtresult" className="form-label">
              Resultado:
            </label>
            <input
              type="text"
              id="txtresult"
              className="form-control"
              value={result}
              readOnly
            />
          </div>
          <button className="btn btn-primary" onClick={evaluacion}>
            Evaluar
          </button>
        </div>
        <div className="col">
          <h2>Entrenar</h2>
          <div className="mb-3">
            <label htmlFor="txtw0" className="form-label">
              w0:
            </label>
            <input
              type="text"
              id="txtw0"
              className="form-control"
              value={w0}
              onChange={actualizarManual}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="txtw1" className="form-label">
              w1:
            </label>
            <input
              type="text"
              id="txtw1"
              className="form-control"
              value={w1}
              onChange={actualizarManual}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="txtw2" className="form-label">
              w2:
            </label>
            <input
              type="text"
              id="txtw2"
              className="form-control"
              value={w2}
              onChange={actualizarManual}
            />
          </div>
          <button className="btn btn-primary" onClick={enseñar}>
            Entrenar
          </button>
        </div>
      </div>
    </div>
  );

};

export default MyComponent;
