import React from "react";
import Navigation from "../../components/User/Navigation";

const TermssndConditionsPage = ({}) => {
  return (
    <div>
      <Navigation selectedPage="terms" />
      <h1
        style={{
          marginTop: "80px",
          color: "black",
          textAlign: "center",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        Terms & Conditions
      </h1>
      <br />
      <h1
        style={{
          textAlign: "center",
          textDecoration: "underline",
          fontWeight: "bold",
        }}
      >
        GENERAL TERMS AND CONDITIONS APPLICABLE FOR USE OF THE ONLINE SEAT
        RESERVATION SERVICE OF SRI LANKA RAILWAYS.
      </h1>

      <div style={{ margin: "50px", lineHeight: "30px" }}>
        <p>
          01 . Prior to making a reservation through the Service, you are
          strongly advised to be vigilant of the following guidelines and comply
          with the same;{" "}
        </p>
        <ul style={{ listStyleType: "square", marginLeft: "60px" }}>
          <li>Select the correct train for your journey.</li>
          <li>Fix a convenient date for both up & down journeys.</li>
          <li>
            Ensure that you have a thorough understanding of the rates
            applicable.
          </li>
          <li>Maximum of 5 seats could be reserved at once.</li>
          <li>
            Standard customer verification and other terms and conditions would
            apply.
          </li>
          <li>
            NIC numbers of each and every passenger except "DEPENDENT" should be
            furnished.
          </li>
          <li>
            A reference number along with ticket details will be sent via email
            to commuters who make the reservation via website and/or mobile app.
          </li>
          <li>
            Commuters are requested to present the booking reference number for
            ticket printing purposes and notify any enquiries related to their
            reservation to the railway officer at the counters. Tickets can be
            printed at any existing ticket printing location of Sri Lanka
            Railways (Please click Ticket printing locations tab) and it is
            recommended to get printed the ticket in advance.
          </li>
          <li>
            Passengers must provide the booking reference number along with
            their NIC or passport in person at the Station Counter and ticket
            will not be issued to any third party.
          </li>
          <li>
            A reservation only becomes guaranteed once full payment has been
            received by Sri Lanka Railways.
          </li>
          <li>
            No fresh tickets will be issued in lieu of misplaced or lost
            tickets.
          </li>
          <li>The reserved tickets could be used only for specified trains.</li>
          <li>
            Travelling on any other trains by using these types of tickets are
            strictly prohibited. An ordinary travelling ticket should be
            purchased for travelling to a transits station to catch a reserved
            train.
          </li>
          <li>
            All tickets issued through the Service are the property of Sri Lanka
            Railways. Tickets are non-transferable and should be handed over to
            the destination station before leaving the station after the
            journey. Sri Lanka Railways officers have the authority to request
            and check the tickets at any given moment.
          </li>
        </ul>
        <br />
        <h1
          style={{
            textAlign: "left",
            textDecoration: "underline",
            fontWeight: "bold",
          }}
        >
          PAYMENT METHODS
        </h1>

        <p>
          You should use a valid VISA or Master Credit/ Debit card when making
          online reservations through the internet.{" "}
        </p>
        <br />
        <h1
          style={{
            textAlign: "left",
            textDecoration: "underline",
            fontWeight: "bold",
          }}
        >
          Debit/Credit Card, Bank Account Details:
        </h1>
        <p>
          You agree that the debit/credit card details provided by you for use
          of the Sri Lanka Railways online seat reservation service is correct
          and accurate and you shall not use a Debit/ credit card, that is not
          lawfully owned by you or the use of which is not authorized by the
          lawful owner thereof. You further agree and undertake to provide
          correct and valid debit/credit card details.{" "}
        </p>
        <br />
        <p>
          You agree, understand and confirm that your personal data including
          without limitation details relating to debit card/ credit card
          transmitted over the Internet may be susceptible to misuse, hacking,
          theft and/ or fraud and the Sri Lanka Railways or your Payment Service
          Provider(s) have no control over such matters.{" "}
        </p>
        <br />
        <p>
          The Sri Lanka Railways (including its service providers and
          suppliers), the Payment Service Provider(s) and its affiliates and
          associates shall not be liable, at any time, for any failure of
          performance, error, omission, interruption, deletion, defect, delay in
          operation or transmission, computer virus, communications line
          failure, theft or destruction or unauthorized access to, alteration
          of, or use of information contained on the Website.{" "}
        </p>
        <br />
        <p>
          You warrant, agree and confirm the following when you initiate a
          payment transaction through the Service and/or issue an online payment
          instruction and/or provide your card / bank details:{" "}
        </p>
        <br />

        <ul style={{ listStyleType: "circle", marginLeft: "60px" }}>
          <li>
            You are fully and lawfully entitled to use such credit / debit card,
            bank account for such transactions.
          </li>
          <li>
            You are responsible to ensure that the card/ bank account details
            provided by you are accurate.
          </li>
          <li>
            You authorize debit of the nominated card/ bank account for the
            payment of fees selected by you.
          </li>
          <li>
            You are responsible to ensure that sufficient credit is available on
            the nominated card/ bank account at the time of making the payment
            to permit the payment of the dues payable or fees selected by you.
          </li>
        </ul>
        <p>
          You are responsible for all transactions performed utilizing your
          credit/debit card and/or bank account.
        </p>
      </div>
    </div>
  );
};

export default TermssndConditionsPage;
