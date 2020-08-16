$(document).ready(function () {
  let firstFuel;
  let firstInsurance;
  let firstRepair;
  let secondRepair;
  let secondInsurance;
  let secondFuel;
  let firstCarTotal;
  let secondCarTotal;
  let mostExpensive;


  let tenorLemonApi = 'https://api.tenor.com/v1/search?q=lemon&key=11YWAZYIYDS3&limit=8'

  let lemonGif;

  $.get(tenorLemonApi).then(function (response) {
    lemonGif = response.results[3].media[0].tinygif.url

  })


  let tenorCarApi = 'https://api.tenor.com/v1/search?q=car&key=11YWAZYIYDS3&limit=8'
  let carGif;

  $.get(tenorCarApi).then(function (response) {
    console.log(response.results[1].media[0].tinygif.url)
    carGif = response.results[1].media[0].tinygif.url
  })


  //This is where we hide the card for the vin check only
  $("#VinCheck").hide();
  $("#vinApiInput").hide();
  //This is the click event on the check only VIN
  $("#checkVin").on("click", function (e) {
    $('#compareForm').hide();
    e.preventDefault();
    $("#vinApiInput").show();
    $("#vinApiInput").css("display", "block");
  });
  //This is marcos onclick on the check vin and his informaition
  $("#checkOneVin").on("click", function (e) {
    let userVinNumber = $("#vinNumber").val();
    $('#compareContainer1').hide();
    $('#compareContainer2').hide();
    $("#carouselExampleSlidesOnly").hide();
    $("#finalSaving").hide();
    let onlyVinCheck = $("#VinCheck").show();
    onlyVinCheck.addClass('one wide column');
    $("#carouselContainer").append(onlyVinCheck);
    //This is the input of the user 

    e.preventDefault();
    // OwnershipCost AJAX
    let ownershipCost = 'http://ownershipcost.vinaudit.com/getownershipcost.php?vin=' + userVinNumber + '&key=0UCAOK5F1GEGDMD&state=WA'

    $.get(ownershipCost).then(function (response) {
      console.log(response)
      if (!response.success) {
        $('#carouselExampleSlidesOnly').show();
        $("#incorrectVIN1").show()

        $('#VinCheck').hide();

      } else {
        $("#incorrectVIN1").hide()

        let depreciation = response.depreciation_cost;
        console.log(depreciation);
        let totalDepreciation = 0;

        for (i = 0; i < depreciation.length; i++) {
          totalDepreciation += depreciation[i]
        }
        console.log(totalDepreciation)
        // Last year's maintenance cost
        console.log(response.maintenance_cost.slice(-1))
        // Last year's Insurance
        console.log(response.insurance_cost.slice(-1))
        // Last year's repair cost
        console.log(parseInt(response.repairs_cost.slice(-1)))
        let tryThis = parseInt(response.repairs_cost.slice(-1))

        console.log(tryThis)
      }

      // line 87 gives all market values
    })


    //This is the api for the first Vin only check starts
    let objectVin =
      "https://specifications.vinaudit.com/v3/specifications?key=0UCAOK5F1GEGDMD&format=json&include=attributes,equipment,colors,recalls,warranties,photos&vin=" +
      userVinNumber +
      "";

    $.get(objectVin).then(function (response) {
      console.log(response);
      var checkVINimage1 = response.photos[0].url;
      $("#vinCheckImageCompare1").attr("src", checkVINimage1);

      var checkVINimage2 = response.photos[1].url;
      $("#vinCheckImageCompare2").attr("src", checkVINimage2);

      var checkVINmake = response.attributes.make;

      var checkVINmodel = response.attributes.model;

      var checkVINyear = response.attributes.year;
      $("#theVinCarEl").text(checkVINmake + " " + checkVINmodel + " " + checkVINyear);

      var checkVINtrim = response.attributes.trim;
      $("#theVinTrimEl").text("Trim: " + checkVINtrim);

      var checkVINprice =
        response.attributes.manufacturer_suggested_retail_price;
      $("#theVinPriceEl").text("Price: " + checkVINprice)

      var checkVINengine = response.attributes.engine;
      $("#theVinEngineEl").text("engine: " + checkVINengine)

      var checkVINcityMpg = response.attributes.city_mileage;
      $("#theVinCItyMlgEl").text("City mileage: " + checkVINcityMpg)

      var checkVINhighwayMpg = response.attributes.highway_mileage;
      $("#theVinHeighwayMlgEl").text("Highway mileage: " + checkVINhighwayMpg)

      var checkVINweight = response.attributes.curb_weight;
      $("#theVinWeightEl").text("Weight: " + checkVINweight)

      var checkVINtransmission = response.attributes.transmission;
      $("#theVinTransmissionEl").text("Transmission: " + checkVINtransmission);

      var checkVINfuel = response.attributes.fuel_type;
      $("#theVinFuelEl").text("Type of Fuel: " + checkVINfuel)

      var checkVINrecallObject = response.recalls.length;
      $("#theVinRecallEl").text("Previous Recalls: " + checkVINrecallObject);

      //This is the api for the fuel cost 
      let ownershipCost = 'http://ownershipcost.vinaudit.com/getownershipcost.php?vin=' + userVinNumber + '&key=0UCAOK5F1GEGDMD&state=WA'
      $.get(ownershipCost).then(function (response) {
        console.log(response)
        let fuelCostLibrary = response.fuel_cost.length - response.fuel_cost.length - 1;
        console.log(fuelCostLibrary)

      })
    });
  });
  //This is Miguels inforation and his functions
  //hide this untill clicked
  $("#compareForm").hide();
  $("#compareContainer1").hide()
  $("#finalSaving").hide()
  $("#compareContainer2").hide()
  $("#incorrectVIN1").hide()
  $("#incorrectVIN2").hide()
  //This is the click on the first compare
  $("#compareTwo").click(function () {
    $("#compareForm").show();
    $('#vinApiInput').hide();
    //this is the click on the ready compare
    $("#readyCompare").click(function () {
      $('#VinCheck').hide();
      $("#carouselExampleSlidesOnly").hide()
      var firstContainerCompare = $("#compareContainer1").show()
      firstContainerCompare.addClass("six wide column");
      var finalSaving = $("#finalSaving").show();
      finalSaving.addClass("four wide column");
      var secondContainerCompare = $("#compareContainer2").show()
      secondContainerCompare.addClass("six wide column");

      $("#carouselContainer").append(firstContainerCompare, finalSaving, secondContainerCompare)

      var firstVehicleVIN = $("#firstVehicle").val();
      var secondVehicleVIN = $("#secondVehicle").val();

      //here i start the api for the first vehicle
      var firstCarURL =
        "https://specifications.vinaudit.com/v3/specifications?key=0UCAOK5F1GEGDMD&format=json&include=attributes,equipment,colors,recalls,warranties,photos&vin=" +
        firstVehicleVIN +
        "";

      console.log(firstCarURL);
      //This is the information for the first vehicle
      $.get(firstCarURL).then(function (response1) {
        console.log(response1);
        //The prompt incase the vin is an invalid number
        if (!response1.success) {
          $('#carouselExampleSlidesOnly').show();

          $("#incorrectVIN2").show()
          $('#compareContainer1').hide();
          $('#compareContainer2').hide();
          $("#finalSaving").hide();

        } else {

          $("#incorrectVIN2").hide()
          //here are the variables for my first vehicle
          var firstVINimage1 = response1.photos[0].url;
          $("#firstImageCompare1").attr("src", firstVINimage1);

          var firstVINimage2 = response1.photos[1].url;
          $("#firstImageCompare2").attr("src", firstVINimage2);

          var firstVINmake = response1.attributes.make;
          var firstVINmodel = response1.attributes.model;
          var firstVINyear = response1.attributes.year;
          $("#theCarEl1").text(firstVINmake + " " + firstVINmodel + " " + firstVINyear);

          var firstVINtrim = response1.attributes.trim;
          $("#theTrimEl1").text("Trim: " + firstVINtrim);

          var firstVINprice =
            response1.attributes.manufacturer_suggested_retail_price;
          $("#thePriceEl1").text("Price: " + firstVINprice)

          var firstVINengine = response1.attributes.engine;
          $("#theEngineEl1").text("engine: " + firstVINengine)

          var firstVINcityMpg = response1.attributes.city_mileage;
          $("#theCItyMlgEl1").text("City mileage: " + firstVINcityMpg)

          var firstVINhighwayMpg = response1.attributes.highway_mileage;
          $("#theHeighwayMlgEl1").text("Highway mileage: " + firstVINhighwayMpg)

          var firstVINweight = response1.attributes.curb_weight;
          $("#theWeightEl1").text("Weight: " + firstVINweight)

          var firstVINtransmission = response1.attributes.transmission;
          $("#theTransmissionEl1").text("Transmission: " + firstVINtransmission);

          var firstVINfuel = response1.attributes.fuel_type;
          $("#theFuelEl1").text("Type of Fuel: " + firstVINfuel)

          var firstVINrecallObject = response1.recalls.length;
          $("#theRecallEl1").text("Previous Recalls: " + firstVINrecallObject);

          let carOneOwnershipCost = 'http://ownershipcost.vinaudit.com/getownershipcost.php?vin=' + firstVehicleVIN + '&key=0UCAOK5F1GEGDMD&state=WA'


          $.get(carOneOwnershipCost).then(function (response) {
            console.log(response)
            var depreciation = response.depreciation_cost;
            console.log(depreciation);

            var totalDepreciation = 0;

            for (i = 0; i < depreciation.length; i++) {
              totalDepreciation += depreciation[i]
            }
            //These items need to append or go in to a div for the single car data to be displayed
            // this is total depreciation need to find a way to merge both the total price AJAX and this one 
            console.log(totalDepreciation)
            //  -------- All for the first vehicle ----------
            // Last year's fuel cost
            firstFuel = response.fuel_cost[response.fuel_cost.length-1]
            $('#firstVehicleFuel').append(" $" +firstFuel + ' cost')
            // Last year's Insurance
            firstInsurance = response.insurance_cost[response.insurance_cost.length-1]
            $('#firstVehicleInsurance').append(" $" +firstInsurance + ' cost')
            // Last year's repair cost
            firstRepair = response.repairs_cost[response.repairs_cost.length-1]
            $('#firstVehicleMaintenance').append(" $"+ firstRepair + ' cost')
            
            firstCarTotal = firstFuel+firstInsurance+firstRepair;
            $('#firstCarTotal').append(" $" + firstCarTotal + ' cost')
            mostExpensive.push(firstCarTotal)
          })
        }
      });

      //here i start the api for the second vehicle
      var secondCarURL =
        "https://specifications.vinaudit.com/v3/specifications?key=0UCAOK5F1GEGDMD&format=json&include=attributes,equipment,colors,recalls,warranties,photos&vin=" +
        secondVehicleVIN +
        "";

      //duane vin JTHBA1D27G5004260
      //marcos vin 1vwcm7a34fc006570
      console.log(secondCarURL);
      //This is the information for the first vehicle
      $.get(secondCarURL).then(function (response2) {
        console.log(response2);
        //This is if the VIN number is incorrect
        if (!response2.success) {
          $('#carouselExampleSlidesOnly').show();

          $("#incorrectVIN2").show()
          $('#compareContainer1').hide();
          $('#compareContainer2').hide();
          $("#finalSaving").hide()

        } else {

          $("#incorrectVIN2").hide()
          //here are the variables for my second vehicle
          var secondVINimage1 = response2.photos[0].url;
          $("#secondImageCompare1").attr("src", secondVINimage1);

          var secondVINimage2 = response2.photos[1].url;
          $("#secondImageCompare2").attr("src", secondVINimage2);

          var secondVINmake = response2.attributes.make;
          var secondVINmodel = response2.attributes.model;
          var secondVINyear = response2.attributes.year;
          $("#theCarEl2").text(secondVINmake + " " + secondVINmodel + " " + secondVINyear);

          var secondVINtrim = response2.attributes.trim;
          $("#theTrimEl2").text("Trim: " + secondVINtrim);

          var secondVINprice =
            response2.attributes.manufacturer_suggested_retail_price;
          $("#thePriceEl2").text("Price: " + secondVINprice)

          var secondVINengine = response2.attributes.engine;
          $("#theEngineEl2").text("engine: " + secondVINengine)

          var secondVINcityMpg = response2.attributes.city_mileage;
          $("#theCItyMlgEl2").text("City mileage: " + secondVINcityMpg)

          var secondVINhighwayMpg = response2.attributes.highway_mileage;
          $("#theHeighwayMlgEl2").text("Highway mileage: " + secondVINhighwayMpg)

          var secondVINweight = response2.attributes.curb_weight;
          $("#theWeightEl2").text("Weight: " + secondVINweight)

          var secondVINtransmission = response2.attributes.transmission;
          $("#theTransmissionEl2").text("Transmission: " + secondVINtransmission)

          var secondVINfuel = response2.attributes.fuel_type;
          $("#theFuelEl2").text("Type of Fuel: " + secondVINfuel)

          var secondVINrecallObject = response2.recalls.length;
          $("#theRecallEl2").text("Previous Recalls: " + secondVINrecallObject)
        }
      });
      let secondCarOwnershipCost = 'http://ownershipcost.vinaudit.com/getownershipcost.php?vin=' + secondVehicleVIN + '&key=0UCAOK5F1GEGDMD&state=WA'


      $.get(secondCarOwnershipCost).then(function (response) {
        console.log(response);

         //  -------- All for the second vehicle ----------
        // Last year's fuel cost
        secondFuel = response.fuel_cost[response.fuel_cost.length-1]
        $('#secondVehicleFuel').append(secondFuel)
        // $('#fuelSavings').append(secondFuel)
        // Last year's Insurance
        secondInsurance = response.insurance_cost[response.insurance_cost.length-1]
        $('#secondVehicleInsurance').append(`$${secondInsurance} cost`)
        // $('#insuranceSavings').append(secondInsurance)
        // Last year's repair cost
        secondRepair = response.repairs_cost[response.repairs_cost.length-1]
        $('#secondVehicleMaintenance').append(`$${secondRepair} cost` )
        // $('#maintenanceSaving').append(secondRepair)

                    
        secondCarTotal = secondFuel + secondInsurance + secondRepair;
        $('#secondCarTotal').append(" $" + secondCarTotal + ' cost')
        mostExpensive.push(secondCarTotal)
        console.log(firstCarTotal +''+ secondCarTotal)
      })
      console.log(firstCarTotal +''+ secondCarTotal)
    });
    console.log(firstCarTotal +''+ secondCarTotal)
  });

  console.log(firstCarTotal +''+ secondCarTotal)

  // mostExpensive.push(firstCarTotal)
  // console.log(mostExpensive)
  // mostExpensive.push(secondCarTotal)
  // mostExpensive = math.max(mostExpensive)
 console.log(mostExpensive)

 
});

