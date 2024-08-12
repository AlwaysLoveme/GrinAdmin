export const baseOptions = {
  timestamps: true,
  toJSON: {
    versionKey: false,
    virtuals: true,
    transform: (_: any, ret: Record<string, any>) => {
      delete ret._id;
    },
  },
};
