import React from 'react';
import { Helmet } from 'react-helmet';
import '../css/member.css';
import { BsTelephone } from 'react-icons/bs';
import { MdAlternateEmail } from 'react-icons/md';
import PopUp from '../components/PopUp';
import { ReactComponent as User } from '../images/svg/usercheck.svg';


const Member = () => {
  return (
    <>
      <Helmet>
        <title>FridayIntel-Member</title>
      </Helmet>

      <main>
        <section className="account-container">
          <h1 className="account-heading">Your Account</h1>
          <p className="account-description">
            Manage your account & subscription
          </p>
        </section>
        <section className="member_details">
          <article>
            <User />
          </article>

          <article className="agency_description">
            <h3>Unit Charlie</h3>
            <h4>Kangaroo Agency</h4>
          </article>

          <article className="member_contact">
            <h4>
              <MdAlternateEmail /> john.doe@fridayintel.io
            </h4>
            <h4>
              <BsTelephone /> +91 99999 99999
            </h4>
          </article>
        </section>
        <section className="transaction-details">
          <article className="subscription_details">
            <h3>Subscription Validity</h3>
            <div>
              <h6>Annually </h6>
              <p>(27 days remaining)</p>
            </div>
            <button>Renew Activation</button>
            <a href="#cancel subscription">Cancel Subscription</a>
          </article>
          <article>
            <table className="GeneratedTable">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Invoice No.</th>
                  <th>₹ Total</th>
                  <th>Payment Method</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>20-11-2022</td>
                  <td>CID001</td>
                  <td>20,00,000</td>
                  <td>Cheque - 666666</td>
                </tr>
                <tr>
                  <td>20-12-2022</td>
                  <td>CID002</td>
                  <td>20,00,000</td>
                  <td>Cheque - 666666</td>
                </tr>
                <tr>
                  <td>20-01-2023</td>
                  <td>CID003</td>
                  <td>20,00,000</td>
                  <td>Cheque - 666666</td>
                </tr>
                <tr>
                  <td>20-02-2023</td>
                  <td>CID004</td>
                  <td>20,00,000</td>
                  <td>Cheque - 666666</td>
                </tr>
              </tbody>
            </table>
          </article>
        </section>
      </main>
      <PopUp />
      <footer className="footer-member ">
        &copy; 2023-24 Friday Intel LLP
      </footer>
    </>
  );
};

export default Member;
