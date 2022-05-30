import { t } from "@lingui/macro";
import { Box, Button, SvgIcon, Typography, useTheme } from "@mui/material";
import { PrimaryButton } from "@olympusdao/component-library";
import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as WalletIcon } from "src/assets/icons/wallet.svg";

export const InPageConnectButton = () => {
  return (
    <RainbowConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        return (
          <div
            {...(!mounted && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!mounted || !account || !chain) {
                return <PrimaryButton onClick={openConnectModal}>Connect Wallet</PrimaryButton>;
              }
            })()}
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  );
};
export const ConnectButton = () => {
  const location = useLocation();
  const theme = useTheme();

  const walletDrawerOpen =
    location.pathname === "/wallet" || location.pathname === "/utility" || location.pathname === "/info" ? true : false;

  return (
    <RainbowConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
        return (
          <div
            {...(!mounted && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!mounted || !account || !chain) {
                if (walletDrawerOpen) {
                  return (
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      sx={{
                        height: "39px",
                        borderRadius: "6px",
                        padding: "9px 18px",
                        cursor: "pointer",
                        background: theme.colors.paper.card,
                      }}
                      onClick={openConnectModal}
                    >
                      <SvgIcon component={WalletIcon} style={{ marginRight: "9px" }} />
                      <Typography>{t`Connect`}</Typography>
                    </Box>
                  );
                } else {
                  return (
                    <Link to={"/wallet"} state={{ prevPath: location.pathname }} style={{ marginRight: "0px" }}>
                      <Button variant="contained" color="secondary">
                        <SvgIcon component={WalletIcon} style={{ marginRight: "9px" }} />
                        <Typography>{t`Connect`}</Typography>
                      </Button>
                    </Link>
                  );
                }
              }

              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    style={{ fontSize: "0.875rem" }}
                    variant="contained"
                    color="secondary"
                  >
                    <SvgIcon component={WalletIcon} style={{ marginRight: "9px" }} />
                    Unsupported Network
                  </Button>
                );
              }

              return (
                <Box display="flex" alignItems="center">
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{
                      height: "39px",
                      borderRadius: "6px",
                      padding: "9px 18px",
                      cursor: "pointer",
                      background: walletDrawerOpen ? theme.colors.paper.card : theme.colors.paper.background,
                    }}
                    onClick={openChainModal}
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 24,
                          height: 24,
                          borderRadius: 999,
                          overflow: "hidden",
                        }}
                      >
                        {chain.iconUrl && (
                          <img alt={chain.name ?? "Chain icon"} src={chain.iconUrl} style={{ width: 24, height: 24 }} />
                        )}
                      </div>
                    )}
                  </Box>
                  {walletDrawerOpen ? (
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{
                        marginLeft: "6px",
                        fontSize: "0.875rem",
                        height: "39px",
                        borderRadius: "6px",
                        padding: "9px 18px",
                        cursor: "pointer",
                        background: theme.colors.paper.card,
                      }}
                      onClick={openAccountModal}
                    >
                      <SvgIcon component={WalletIcon} style={{ marginRight: "9px" }} />
                      {account.displayName}
                    </Box>
                  ) : (
                    <Link to={"/wallet"} state={{ prevPath: location.pathname }} style={{ marginRight: "0px" }}>
                      <Button style={{ fontSize: "0.875rem" }} variant="contained" color="secondary">
                        <SvgIcon component={WalletIcon} style={{ marginRight: "9px" }} />
                        {account.displayName}
                      </Button>
                    </Link>
                  )}
                </Box>
              );
            })()}
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  );
};

export default ConnectButton;
