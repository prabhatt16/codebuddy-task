import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const API_URL = 'https://codebuddy.review';
  const [pageNumber, setPageNumber] = useState(1);
  const [err, setErr] = useState('');
  const [payload, setPayload] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  const re = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
  const rp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const finalCheck = () => {
    if (
      payload !== {} &&
      re.test(payload?.emailId) &&
      payload?.emailId !== '' &&
      payload?.emailId !== undefined &&
      rp.test(payload?.password) &&
      payload?.password !== '' &&
      payload?.password !== undefined &&
      payload?.firstName !== '' &&
      payload?.firstName !== undefined &&
      payload?.firstName?.length >= 2 &&
      payload?.firstName?.length <= 50 &&
      payload?.address !== '' &&
      payload?.address !== undefined &&
      payload?.address?.length >= 10 &&
      payload?.countryCode !== '' &&
      payload?.countryCode !== undefined &&
      payload?.phoneNumber !== '' &&
      payload?.phoneNumber !== undefined &&
      payload?.phoneNumber?.length === 10 &&
      isChecked !== false
    ) {
      return true;
    }

    return false;
  };

  async function handleSubmit() {
    if (!finalCheck()) {
      setErr('error');

      setTimeout(() => {
        setErr('');
      }, 3000);
    } else {
      fetch(`${API_URL}/submit`, {
        method: 'POST',
        body: await JSON.stringify(payload),
      })
        .then(() => {
          navigate('/posts');
        })
        // eslint-disable-next-line no-console
        .catch(e => console.log(e));
    }
  }

  const handleChange = btn => {
    switch (btn) {
      case 'back':
        setPageNumber(pageNumber > 0 ? pageNumber - 1 : pageNumber);
        break;
      case 'next':
        setPageNumber(pageNumber < 3 ? pageNumber + 1 : pageNumber);
        break;
      case 'save':
        handleSubmit();
        break;
      default:
        break;
    }
  };

  return (
    <form>
      <div className="mainContainerOfHome">
        <h4 className="text-center " style={{ margin: '18px' }}>
          Hey there!
        </h4>
        {err !== '' && (
          <h3 style={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>
            All fields are required!
          </h3>
        )}
        {pageNumber === 1 ? (
          <div>
            <div className="input-group mb-1">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={payload?.emailId ? payload?.emailId : ''}
                aria-label="Enter Email"
                aria-describedby="basic-addon1"
                onChange={e => setPayload({ ...payload, 'emailId': e.target.value })}
              />
            </div>
            {!re.test(payload?.emailId) &&
            payload.emailId !== '' &&
            payload.emailId !== undefined ? (
              <p style={{ color: 'red', fontSize: '8px' }}>Please enter valid email-id</p>
            ) : (
              <></>
            )}

            <div className="input-group mb-1">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={payload?.password ? payload?.password : ''}
                aria-label="Password"
                aria-describedby="basic-addon1"
                onChange={e => setPayload({ ...payload, 'password': e.target.value })}
              />
            </div>
            {!rp.test(payload?.password) &&
            payload.password !== '' &&
            payload.password !== undefined ? (
              <p style={{ color: 'red', fontSize: '8px' }}>
                {' '}
                Must contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special
                characters.
              </p>
            ) : (
              <></>
            )}
          </div>
        ) : pageNumber === 2 ? (
          <div>
            <div className="input-group mb-1">
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                value={payload?.firstName ? payload?.firstName : ''}
                aria-label="First Name"
                aria-describedby="basic-addon1"
                onChange={e =>
                  setPayload({
                    ...payload,
                    'firstName': e.target.value.replace(/[^a-z]/gi, ''),
                  })
                }
              />
            </div>
            {payload?.firstName !== '' &&
            payload?.firstName !== undefined &&
            payload?.firstName?.length === 1 &&
            payload?.firstName?.length > 50 ? (
              <p style={{ color: 'red', fontSize: '8px' }}>Minimum of 2 character and maximum 50</p>
            ) : (
              <></>
            )}
            <div className="input-group mb-1">
              <input
                type="text"
                className="form-control"
                placeholder="Last Name (optional)"
                value={payload?.lastName ? payload?.lastName : ''}
                aria-label="Last Name (optional)"
                aria-describedby="basic-addon1"
                onChange={e =>
                  setPayload({ ...payload, 'lastName': e.target.value.replace(/[^a-z]/gi, '') })
                }
              />
            </div>

            <div className="input-group mb-1">
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                value={payload?.address ? payload?.address : ''}
                aria-label="Address"
                aria-describedby="basic-addon1"
                onChange={e => setPayload({ ...payload, 'address': e.target.value })}
              />
            </div>
            {payload?.address !== '' &&
            payload?.address !== undefined &&
            payload?.address?.length < 10 ? (
              <p style={{ color: 'red', fontSize: '8px' }}>Please enter valid address</p>
            ) : (
              <></>
            )}
          </div>
        ) : pageNumber === 3 ? (
          <div>
            <div>
              <select
                style={{ width: '100%', padding: '7px', borderRadius: '6px', marginBottom: '6px' }}
                onChange={e => {
                  setPayload({ ...payload, 'countryCode': e.target.value });
                }}
                placeholder="select"
              >
                <option value="+91">India (+91)</option>
                <option value="+1">America (+1)</option>
              </select>
            </div>
            {payload?.countryCode === '' && payload?.countryCode === undefined ? (
              <p style={{ color: 'red', fontSize: '8px' }}>Please choose country code</p>
            ) : (
              <></>
            )}
            <div className="input-group mb-1">
              <input
                type="number"
                className="form-control"
                placeholder="Phone Number"
                value={payload?.phoneNumber ? payload?.phoneNumber : ''}
                aria-label="Phone Number"
                aria-describedby="basic-addon1"
                onChange={e => setPayload({ ...payload, 'phoneNumber': e.target.value })}
              />
            </div>
            {payload?.phoneNumber !== '' &&
            payload?.phoneNumber !== undefined &&
            payload?.phoneNumber?.length !== 10 ? (
              <p style={{ color: 'red', fontSize: '8px' }}>Please enter valid phoneNumber</p>
            ) : (
              <></>
            )}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'start',
                alignItems: 'center',
                padding: '12px',
              }}
            >
              <input
                type="checkbox"
                style={{ marginRight: '10px' }}
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <p style={{ margin: '0px', padding: '0px', fontSize: '12px' }}>
                accept TermsAndCondition
              </p>
            </div>
            {isChecked === false ? (
              <p style={{ color: 'red', fontSize: '8px' }}>Please check terms & condition</p>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div />
        )}

        <div
          style={{
            display: 'flex',
            justifyContent: pageNumber === 1 ? 'center' : 'space-between',
            alignItems: 'center',
          }}
        >
          {pageNumber !== 1 && <Button onClick={() => handleChange('back')}>Back</Button>}
          {pageNumber === 3 && <Button onClick={() => handleChange('save')}>Save</Button>}
          {pageNumber !== 3 && <Button onClick={() => handleChange('next')}>Next</Button>}
        </div>
      </div>
    </form>
  );
};

export default Home;
