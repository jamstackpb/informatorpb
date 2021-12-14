import styled from "@emotion/styled";

export const Wrapper = styled.div`
    .stop-scrolling {
        height: 100%;
        overflow: hidden;
    }
    #page-counter{
        display: flex;
        flex-direction: row;
        gap: 4px;
        justify-content: center;
    }
    .conatiner {
        width: full;
        height: full;
    }
    #flipbook-container {
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.5);
        display: none;
        background-size: cover;
        margin-right: auto;
        margin-left: auto;
        margin-bottom:25px;
    }
    .page {
        background-color: white;
        border: solid 1px #C2B5A3;
        overflow: auto;
        .page-content {
            width: 95%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: stretch;
            padding-left:1rem;
            .page-header {
                font-size: 100%;
                text-transform: uppercase;
                text-align: center;
            }

            .page-image {
                height: 100%;
                background-size: contain;
                background-position: center center;
                background-repeat: no-repeat;
            }

            .page-footer {
                height: 30px;
                border-top: solid 1px #F4E8D7;
                font-size: 80%;
                color: #998466;
                border-bottom: 20px;
            }
        }
      &.--left { // for left page (property will be added automatically)
    border-right: 0;
    box-shadow: inset -7px 0 30px -7px rgba(0, 0, 0, 0.4);
  }

  &.--right { // for right page (property will be added automatically)
    border-left: 0;
    box-shadow: inset 7px 0 30px -7px rgba(0, 0, 0, 0.4);

    .page-footer {
      text-align: right;
    }
  }

  &.hard { // for hard page
    background-color: #F2E8D9;
    border: solid 1px #998466;
  }

  &.page-cover {
    background-color: #E3D0B5;
    color:  #785E3A;
    border: solid 1px #998466;

    h1 {
      text-align: center;
      padding-top: 50%;
      font-size: 210%;
    }

    &.page-cover-top {
      box-shadow: inset 0px 0 30px 0px rgba(36, 10, 3, 0.5), -2px 0 5px 2px rgba(0, 0, 0, 0.4);
    }

    &.page-cover-bottom {
      box-shadow: inset 0px 0 30px 0px rgba(36, 10, 3, 0.5), 10px 0 8px 0px rgba(0, 0, 0, 0.4);
    }
  }
}
`;