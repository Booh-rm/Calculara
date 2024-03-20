var operators = ["+"];

var box = null;
var last_operation_history = null;
var operator = null;
var equal = null;
var dot = null;

var firstNum = true;

var numbers = [];
var operator_value;
var last_button;
var calc_operator;

var total;

var key_combination = []
function button_number(button) {

    operator = document.getElementsByClassName("operator");
    box = document.getElementById("box");
    last_operation_history = document.getElementById("last_operation_history");
    equal = document.getElementById("equal_sign").value;
    dot = document.getElementById("dot").value;

    last_button = button;

    // si el botón no es un operador o el signo = 
    if (!operators.includes(button) && button != equal) {
        // si es el primer botón presionado
        if (firstNum) {
            // y es un punto, mostrar 0.
            if (button == dot) {
                box.innerText = "0" + dot;
            }
            // de lo contrario, limpiar el cuadro y mostrar el número
            else {
                box.innerText = button;
            }
            firstNum = false;
        }
        else {

            // regresar si el valor del cuadro es 0
            if (box.innerText.length == 1 && box.innerText == 0) {

                if (button == dot) {
                    box.innerText += button;
                }
                return;
            }
            // regresar si el cuadro ya tiene un punto y el botón presionado es un punto
            if (box.innerText.includes(dot) && button == dot) {
                return;
            }
            // máximo permitido de números ingresados son 20
            if (box.innerText.length == 20) {
                return;
            }

            // si se presiona un punto y el cuadro ya tiene un signo -, mostrar -0.
            if (button == dot && box.innerText == "-") {
                box.innerText = "-0" + dot;
            }
            // de lo contrario, agregar número
            else {
                box.innerText += button;
            }
        }
    }
    // si es un operador o el signo =
    else {

        // regresar si el operador ya está presionado
        if (operator_value != null && button == operator_value) {
            return
        }

        // mostrar signo menos si es el primer valor seleccionado y finalmente regresar
        if (button == "-" && box.innerText == 0) {
            box.innerText = button;
            firstNum = false;
            operator_value = button
            showSelectedOperator()
            return;
        }
        // regresar si se presiona el operador menos y ya está impreso en la pantalla 
        else if (operators.includes(button) && box.innerText == "-") {
            return
        }
        // regresar si se presiona el operador menos y el historial ya tiene el signo igual
        else if (button == "-" && operator_value == "-" && last_operation_history.innerText.includes("=")) {
            return
        }

        // establecer el valor del operador si es uno
        if (operators.includes(button)) {
            if (typeof last_operator != "undefined" && last_operator != null) {
                calc_operator = last_operator
            }
            else {
                calc_operator = button
            }
            if (button == "*") {
                last_operator = "×"
            }
            else if (button == "/") {
                last_operator = "÷"
            }
            else {
                last_operator = button
            }
            operator_value = button
            firstNum = true
            showSelectedOperator()
        }

        // agregar el primer número al arreglo de números y mostrarlo en el historial
        if (numbers.length == 0) {
            numbers.push(box.innerText)
            if (typeof last_operator != "undefined" && last_operator != null) {
                last_operation_history.innerText = box.innerText + " " + last_operator
            }
        }
        // resto de cálculos
        else {
            if (numbers.length == 1) {
                numbers[1] = box.innerText
            }
            var temp_num = box.innerText

            // calcular el total
            if (button == equal && calc_operator != null) {
                var total = calculate(numbers[0], numbers[1], calc_operator)
                box.innerText = total;

                // agregar el segundo número al historial
                if (!last_operation_history.innerText.includes("=")) {
                    last_operation_history.innerText += " " + numbers[1] + " ="
                }

                temp_num = numbers[0]

                numbers[0] = total
                operator_value = null
                showSelectedOperator()

                // reemplazar el primer número del historial con el valor del total
                var history_arr = last_operation_history.innerText.split(" ")
                history_arr[0] = temp_num
                last_operation_history.innerText = history_arr.join(" ")
            }
            // actualizar el historial con el valor en pantalla y el operador presionado
            else if (calc_operator != null) {
                last_operation_history.innerText = temp_num + " " + last_operator
                calc_operator = button
                numbers = []
                numbers.push(box.innerText)
            }
        }
    }

}
// resaltar el botón del operador cuando se selecciona
function showSelectedOperator() {

    var elements = document.getElementsByClassName("operator");

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "#e68a00";
    }

    if (operator_value == "+") {
        document.getElementById("plusOp").style.backgroundColor = "#ffd11a";
    }
    else if (operator_value == "-") {
        document.getElementById("subOp").style.backgroundColor = "#ffd11a";
    }
    else if (operator_value == "*") {
        document.getElementById("multiOp").style.backgroundColor = "#ffd11a";
    }
    else if (operator_value == "/") {
        document.getElementById("divOp").style.backgroundColor = "#ffd11a";
    }
}

// función para calcular el resultado usando dos números y un operador
function calculate(num1, num2, operator) {

    if (operator === "+") {
        total = (parseFloat)(num1) + (parseFloat)(num2)
    }
    else if (operator === "-") {
        total = (parseFloat)(num1) - (parseFloat)(num2)
    }
    else if (operator === "*") {
        total = (parseFloat)(num1) * (parseFloat)(num2)
    }
    else if (operator === "/") {
        total = (parseFloat)(num1) / (parseFloat)(num2)
    }
    else {
        if (total == box.innerText) {
            return total
        }
        else {
            return box.innerText
        }
    }
    // si el total no es un número entero, mostrar máximo 12 decimales
    if (!Number.isInteger(total)) {
        total = total.toPrecision(12);
    }
    return parseFloat(total);
}

// función para borrar la pantalla y reiniciar todo
function button_clear() {
    window.location.reload()
}

function backspace_remove() {

    box = document.getElementById("box");
    var elements = document.getElementsByClassName("operator");

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "#e68a00";
    }

    var last_num = box.innerText;
    last_num = last_num.slice(0, -1)

    box.innerText = last_num

    // muestra "0" si se eliminan todos los caracteres de la pantalla
    if (box.innerText.length == 0) {
        box.innerText = 0
        firstNum = true
    }

}


// función para cambiar el signo del número actualmente en pantalla
function plus_minus() {
    box = document.getElementById("box");

    // si ya se ha presionado algún operador
    if (typeof last_operator != "undefined") {
        if (numbers.length > 0) {
            // si el último botón presionado es un operador
            if (operators.includes(last_button)) {
                // si el texto mostrado es solo un signo negativo, reemplazarlo con un 0
                if (box.innerText == "-") {
                    box.innerText = 0
                    firstNum = true
                    return
                }
                // si el texto mostrado no es solo un signo negativo, reemplazarlo con un signo negativo
                else {
                    box.innerText = "-"
                    firstNum = false
                }
            }
            // si el último botón presionado no es un operador, cambiar su signo
            else {
                box.innerText = -box.innerText

                if (numbers.length == 1) {
                    numbers[0] = box.innerText
                }
                else {
                    numbers[1] = box.innerText
                }
            }
        }
        return
    }

    // si el texto mostrado es 0, reemplazarlo con un signo negativo
    if (box.innerText == 0) {
        box.innerText = "-"
        firstNum = false
        return
    }
    box.innerText = -box.innerText
}

// función para calcular la raíz cuadrada del número actualmente en pantalla
function square_root() {
    box = document.getElementById("box");
    var square_num = Math.sqrt(box.innerText)
    box.innerText = square_num
    numbers.push(square_num)
}

// función para calcular la división de 1 entre el número actualmente en pantalla
function division_one() {
    box = document.getElementById("box");
    var square_num = 1 / box.innerText
    box.innerText = square_num
    numbers.push(square_num)
}

// función para calcular la potencia del número actualmente en pantalla
function power_of() {
    box = document.getElementById("box");
    var square_num = Math.pow(box.innerText, 2)
    box.innerText = square_num
    numbers.push(square_num)
}

// función para calcular el porcentaje de un número
function calculate_percentage() {
    var elements = document.getElementsByClassName("operator");
    box = document.getElementById("box");

    if (numbers.length > 0 && typeof last_operator != "undefined") {

        var perc_value = ((box.innerText / 100) * numbers[0])
        if (!Number.isInteger(perc_value)) {
            perc_value = perc_value.toFixed(2);
        }
        box.innerText = perc_value
        numbers.push(box.innerText)

        // agregar el segundo número al historial
        if (!last_operation_history.innerText.includes("=")) {
            last_operation_history.innerText += " " + numbers[1] + " ="
        }
    }
    else {
        box.innerText = box.innerText / 100
    }

    numbers.push(box.innerText)
    var res = calculate(numbers[0], numbers[1], last_operator)
    box.innerText = res
    operator_value = "="

    // deseleccionar el operador si hay alguno seleccionado
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "#e68a00";
    }
}

// función para borrar el último número ingresado en la pantalla
function clear_entry() {
    box = document.getElementById("box");

    if (numbers.length > 0 && typeof last_operator != "undefined") {
        box.innerText = 0
        var temp = numbers[0]
        numbers = []
        numbers.push(temp)
        firstNum = true;
    }
}

document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyReleased);

// función para capturar eventos de teclado
function keyPressed(e) {
    e.preventDefault()
    var equal = document.getElementById("equal_sign").value;
    var dot = document.getElementById("dot").value;

    if (e.key == "Delete") {
        button_clear();
        return;
    }

    var isNumber = isFinite(e.key);
    var enterPress;
    var dotPress;
    var commaPress = false;

    if (e.key == "Enter") {
        enterPress = equal;
    }
    if (e.key == ".") {
        dotPress = dot;
    }
    if (e.key == ",") {
        commaPress = true;
    }

    if (isNumber || operators.includes(e.key) || e.key == "Enter" || e.key == dotPress ||
        commaPress || e.key == "Backspace") {
        if (e.key == "Enter") {
            button_number(enterPress)
        }
        else if (e.key == "Backspace") {
            document.getElementById("backspace_btn").style.backgroundColor = "#999999";
            backspace_remove()
        }
        else if (commaPress) {
            button_number(dot)
        }
        else {
            button_number(e.key)
        }
    }
    if (e.key) {
        key_combination[e.code] = e.key;
    }
}

// función para capturar eventos del teclado
function keyReleased(e) {
    if (key_combination['ControlLeft'] && key_combination['KeyV']) {
        navigator.clipboard.readText().then(text => {
            box = document.getElementById("box");
            var isNumber = isFinite(text);
            if (isNumber) {
                var copy_number = text
                firstNum = true
                button_number(copy_number)
            }
        }).catch(err => {
            console.error('Error al leer el contenido del portapapeles: ', err);
        });
    }
    if (key_combination['ControlLeft'] && key_combination['KeyC']) {
        box = document.getElementById("box");
        navigator.clipboard.writeText(box.innerText)
    }
    key_combination = []
    e.preventDefault()
    // restablecer el color del botón de retroceso a su valor original
    if (e.key == "Backspace") {
        document.getElementById("backspace_btn").style.backgroundColor = "#666666";
    }
}