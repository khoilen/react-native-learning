import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  form: { marginTop: 10, flexDirection: 'column', gap: 16 },
  forgotBtn: { alignSelf: 'flex-end'},
  cyanText: { color: '#0DF2F2', fontWeight: '600' },
  biometricView: {
    flexDirection: 'row',
  },
  biometricText: { color: '#0DF2F2', fontWeight: '600'},
  footer: { alignItems: 'center' },
  footerText: { color: '#8897AD', marginBottom: 16 },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  socialBtn: {
    width: '50%',
  },
  singInContainer: { flexDirection: 'column', gap: 12 },
  policyText: {
    color: '#9CA3AF',
  },
});
