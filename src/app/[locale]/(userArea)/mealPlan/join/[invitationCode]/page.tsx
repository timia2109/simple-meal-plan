type Props = {
  params: {
    invitationCode: string;
  };
};

export default async function InvitationPage({ params }: Props) {
  return <div>InvitationCode {params.invitationCode}</div>;
}
