$(document).ready(function() { 
    // Function to create power supply systems
    function createPowerSupplySystems(count) {
        const container = $('#power-supply-container');
        container.empty(); // Clear existing systems
        for (let i = 1; i <= count; i++) {
            const powerSupply = `
            <div class="container text-center power-supply box-model mb-4">
                <div class="row">
                    <div class="col">
                        <label for="serial-${i}">Serial No</label>
                        <input type="text" id="serial-${i}" name="serial-${i}" class="form-control" value="${i}" readonly>
                    </div>
                    <div class="col">
                        <label for="subsystem-${i}">Subsystem Name</label>
                        <input type="text" id="subsystem-${i}" name="subsystem-${i}" class="form-control" placeholder="Subsystem ${i}">
                    </div>
                    <div class="col">
                        <label for="id-${i}">Power Supply ID</label>
                        <input type="number" id="id-${i}" name="id-${i}" class="form-control" placeholder="Enter Power Supply ID">
                    </div>
                </div>
            </div>`;
            container.append(powerSupply);
        }
    }

    // Initial load with one power supply system
    createPowerSupplySystems(1);

    // Update power supply systems when user clicks the button
    $('#updateSystemCount').click(function() {
        const numberOfSystems = parseInt($('#numberOfSystems').val());
        if (numberOfSystems > 0) {
            createPowerSupplySystems(numberOfSystems);
        } else {
            alert("Please enter a valid number of systems");
        }
    });

    // Save systems without navigating to another page
    $('#saveAndNavigate').click(function() {
        const systems = [];
        const numberOfSystems = parseInt($('#numberOfSystems').val());
        
        for (let i = 1; i <= numberOfSystems; i++) {
            const subsystem = $(`#subsystem-${i}`).val();
            const powerSupplyId = $(`#id-${i}`).val();
            systems.push({ subsystem, powerSupplyId });
        }
        
        // Store the data in localStorage
        localStorage.setItem('powerSupplyData', JSON.stringify(systems));
        
        // No redirection, just log the systems object
       // console.log("Saved systems:", systems);
        window.open('home.html','_blank');
    });
});
