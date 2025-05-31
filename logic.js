function generateInput() {
      const n = parseInt(document.getElementById("size").value);
      const container = document.getElementById("matrixInput");
      container.innerHTML = '';

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n + 1; j++) {
          const input = document.createElement("input");
          input.type = "number";
          input.id = `cell-${i}-${j}`;
          container.appendChild(input);
        }
        container.appendChild(document.createElement("br"));
      }
    }

    function deepCopy(matrix) {
      return matrix.map(row => [...row]);
    }

    function displayStep(matrix, step) {
      const container = document.getElementById("steps");
      const table = document.createElement("table");
      const caption = document.createElement("caption");
      caption.innerText = `Langkah ${step}`;
      table.appendChild(caption);

      for (let row of matrix) {
        const tr = document.createElement("tr");
        for (let val of row) {
          const td = document.createElement("td");
          td.innerText = val.toFixed(2);
          tr.appendChild(td);
        }
        table.appendChild(tr);
      }

      container.appendChild(table);
    }

    function gaussJordan(matrix) {
      const stepsContainer = document.getElementById("steps");
      stepsContainer.innerHTML = ""; // Clear previous steps
      const rowCount = matrix.length;
      const colCount = matrix[0].length;
      let step = 1;

      for (let i = 0; i < rowCount; i++) {
        // Tukar baris jika pivot 0
        if (matrix[i][i] === 0) {
          for (let j = i + 1; j < rowCount; j++) {
            if (matrix[j][i] !== 0) {
              [matrix[i], matrix[j]] = [matrix[j], matrix[i]];
              break;
            }
          }
        }

        // Normalisasi baris
        const pivot = matrix[i][i];
        for (let k = 0; k < colCount; k++) {
          matrix[i][k] /= pivot;
        }
        displayStep(deepCopy(matrix), step++);
        
        // Eliminasi baris lain
        for (let j = 0; j < rowCount; j++) {
          if (j !== i) {
            const factor = matrix[j][i];
            for (let k = 0; k < colCount; k++) {
              matrix[j][k] -= factor * matrix[i][k];
            }
          }
        }
        displayStep(deepCopy(matrix), step++);
      }

      return matrix.map(row => row[colCount - 1]);
    }

    function hitung() {
      const n = parseInt(document.getElementById("size").value);
      const matrix = [];

      for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < n + 1; j++) {
          const val = parseFloat(document.getElementById(`cell-${i}-${j}`).value);
          row.push(isNaN(val) ? 0 : val);
        }
        matrix.push(row);
      }

      const solusi = gaussJordan(matrix);
      let out = '';
      solusi.forEach((x, i) => {
        out += `x${i + 1} = ${x.toFixed(2)}\n`;
      });

      document.getElementById("output").textContent = out;
    }