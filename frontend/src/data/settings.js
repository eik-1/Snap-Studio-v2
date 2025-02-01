const settings = [
    {
        category: "account",
        heading: "Account",
        fields: [
            {
                name: "email",
                title: "Email",
                buttons: [
                    {
                        action: "updateEmail",
                        text: "Update",
                        type: "normal",
                    },
                ],
            },
            {
                name: "username",
                title: "Account Name",
                buttons: [
                    {
                        action: "updateName",
                        text: "Update",
                        type: "normal",
                    },
                ],
            },
            {
                name: "password",
                title: "Password",
                buttons: [
                    {
                        action: "updatePassword",
                        text: "Update",
                        type: "normal",
                    },
                    {
                        action: "resetPassword",
                        text: "Forgot Password?",
                        type: "secondary",
                    },
                ],
            },
        ],
    },

    {
        category: "subscription",
        heading: "Subscription",
        fields: [
            {
                name: "plan",
                title: "Current Plan",
                buttons: [
                    {
                        action: "upgradePlan",
                        text: "Upgrade",
                        type: "normal",
                    },
                ],
            },
            {
                name: "billCycle",
                title: "Billing Cycle",
                buttons: [
                    {
                        action: "upgradePlanCycle",
                        text: "Upgrade",
                        type: "normal",
                    },
                ],
            },
            {
                name: "billingDate",
                title: "Next Billing Date",
                buttons: [
                    {
                        action: "cancelSubscription",
                        text: "Cancel",
                        type: "destructive",
                    },
                ],
            },
        ],
    },
]
export { settings }
