import { Box } from "@mui/material";
import { red } from "@mui/material/colors";

function Layout() {
  // @typescript-eslint/no-unused-vars
  const case0 = () => {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            border: 1,
            p: 2,
            m: 2,
          }}
        >
          <Box
            sx={{
              height: "60vh",
              border: "1px solid",
              borderColor: red[800],
              p: 2,
              m: 2,
            }}
          >
            111
          </Box>
          <Box border="1px solid" borderColor={red[800]} padding={2} margin={2}>
            222
          </Box>
        </Box>
      </>
    );
  };

  const case1 = () => {
    return (
      <Box height={"80vh"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            sx={{
              height: "65px",
              backgroundColor: "#00c73c",
            }}
          >
            header
          </Box>
          <Box
            sx={{
              height: "70px",
              boxShadow: "0 2px 2px 0",
            }}
          >
            tab list
          </Box>
          <Box
            sx={{
              display: "flex",
              border: 1,
              flex: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "400px",
                backgroundColor: "#bfbab078",
              }}
            >
              left
            </Box>
            <Box
              sx={{
                display: "flex",
                flex: 1,
                border: "1 solid",
                overflow: "auto",
              }}
            >
              contents
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  const case2 = () => {
    return (
      <Box sx={{ display: "flex", backgroundColor: "#00c73c" }}>
        <Box
          sx={{ padding: "20px 30px", backgroundColor: "rgba(0, 0, 0, .4)" }}
        >
          logo
        </Box>
        <Box sx={{ display: "flex", width: "400px", marginLeft: "10px" }}>
          <Box
            sx={{
              flex: 1,
              width: "322px",
              height: "37px",
              backgroundColor: "white",
              m: 1,
            }}
          >
            input
          </Box>
          <Box sx={{ width: "37px", backgroundColor: "#26a93a", border: "0" }}>
            button
          </Box>
        </Box>
        <Box
          sx={{
            padding: "20px 30px",
            backgroundColor: "rgba(0, 0, 0, .4)",
            marginLeft: "auto",
          }}
        >
          gnb
        </Box>
      </Box>
    );
  };

  return <>{case2()}</>;
}
/*
sx:
https://mui.com/system/the-sx-prop/
sx 밖에서 문자가 아닌경우는 {}를 사용
border, borderColor와 같이 순서도 중요
속성
https://mui.com/system/properties/

flex
https://d2.naver.com/helloworld/8540176
*/
export { Layout as default };